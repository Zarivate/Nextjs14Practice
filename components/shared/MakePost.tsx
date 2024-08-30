"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useSession } from "@clerk/nextjs";
import { TimeLimitKeys, dataUrl, debounce, getImageSize2 } from "@/lib/utils";
import { defaultValues2, postTimeLimits } from "@/constants";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { deleteImage } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { InsufficientCreditsModal } from "@/components/shared/InsufficientCredits";

type ImageProps = {
  prevState: any;
  publicId: string;
  width: number;
  height: number;
  secureUrl: string;
};

type UserProps = {
  creditBalance: number;
};

const formSchema = z.object({
  postText: z.string().min(1),
});

const MakePost = ({ creditBalance }: UserProps) => {
  // Grab the user session state so can apply user details to post
  const { session } = useSession();

  // Toast to display upon successful post creation
  const { toast } = useToast();

  // Use states to handle various properties that will be passed to make a post in the database
  const [timeToExpire, setTimeToExpire] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submittingDelete, setSubmittingDelete] = useState(false);
  const [userPost, setUserPost] = useState("");
  const [allowHome, setAllowHome] = useState(false);

  const [publicId, setPublicId] = useState("");
  const [image, setImage] = useState<ImageProps>();

  // Defined user form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postText: "",
    },
  });

  // Function to handle making a post to the database
  const createPost = async () => {
    setSubmitting(true);
    // console.log(session);
    // console.log(session?.user.username);
    // console.log(session?.user.primaryEmailAddress?.emailAddress);
    // console.log(timeToExpire);
    // console.log(allowHome);
    // console.log(image?.publicId);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user.primaryEmailAddress?.emailAddress,
          username: session?.user.username,
          postText: userPost,
          liveTime: timeToExpire,
          allowHome: allowHome,
          imageUrl: image?.publicId,
        }),
      });

      if (response.ok) {
        console.log("Success!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

    form.reset(defaultValues2);
    setPublicId("");
    toast({
      title: "Post made!",
      description: "Your post has succesfully been created.",
      duration: 3000,
      className: "success-toast",
    });
  };

  // Function to handle grabbing the user's profile data, mainly just for their privacy setting
  const grabPrivacy = async () => {};

  // Handler to update user input
  const onInputChangeHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    // Waits a second after user finishes typing before registering anything as opposed to immediately tracking every keystroke
    debounce(() => {
      setUserPost(value);
      // console.log(userPost);
    }, 100)();

    return onChangeField(value);
  };

  // Handler for user expiration time choice
  const timeChoiceHandler = (value: string) => {
    const timeChoice = postTimeLimits[value as TimeLimitKeys];
    setTimeToExpire(timeChoice.timeTL);
  };

  // Handler for whether user allows post to appear on home page or not
  const choicBoxHandler = () => {
    setAllowHome(!allowHome);
  };

  const onUploadSuccess = (result: any) => {
    console.log(result);
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }));
    setPublicId(result?.info?.public_id);
  };

  const onUploadError = () => {
    toast({
      title: "Something went wrong",
      description: "Please try again in a short while",
      duration: 5000,
      className: "error-toast",
    });
  };

  const deleteImageHandler = async () => {
    setSubmittingDelete(true);

    try {
      const deleteResponse = await deleteImage(publicId);

      if (deleteResponse.result === "ok") {
        console.log("Just reset the image field now doofus");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingDelete(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createPost)} className="space-y-8">
          {creditBalance < 1000 && <InsufficientCreditsModal />}
          <FormField
            control={form.control}
            name="postText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Your Post</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // This prevents any typing from hapening for some reason
                    onChange={(e) =>
                      onInputChangeHandler(e.target.value, field.onChange)
                    }
                  />
                </FormControl>
                <FormDescription>
                  This post gets sent to your profile by default but you can
                  also send it to the main home page by clicking the checkbox
                  below.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-start">
            <Checkbox id="terms1" onCheckedChange={choicBoxHandler} />
            <div className="grid gap-1.5 px-5">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow post to appear on homepage.
              </label>
              <p className="text-sm text-muted-foreground">
                If unchecked only you can see your post on your profile.
              </p>
            </div>
            <div className="px-10">
              <Select
                onValueChange={(value) => {
                  timeChoiceHandler(value);
                }}
              >
                <SelectTrigger className="w-[250px] ">
                  <SelectValue placeholder="Select a time limit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(postTimeLimits).map((key) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {postTimeLimits[key as TimeLimitKeys].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CldUploadWidget
            uploadPreset="iz_voidboard"
            options={{
              multiple: false,
              resourceType: "image",
            }}
            onSuccess={onUploadSuccess}
            onError={onUploadError}
          >
            {({ open }) => (
              <div className="flex flex-col gap-4">
                <h3 className="h3-bold text-dark-600">Image</h3>
                {/* This is what gets displayed after a successful Image upload */}
                {publicId ? (
                  <>
                    <button
                      type="button"
                      className="button bg-red-500 text-white"
                      disabled={submittingDelete}
                      onClick={() => deleteImageHandler()}
                    >
                      Clear Image
                    </button>
                    <div className="cursor-pointer overflow-hidden rounded-[10px]">
                      <CldImage
                        width={getImageSize2(image, "width")}
                        height={getImageSize2(image, "height")}
                        src={publicId}
                        alt="userImage"
                        sizes={"(max-width: 900px) 100vw, 100vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="media-uploader_cldImage"
                      />
                    </div>
                  </>
                ) : (
                  // If no publicId is detected then that means no Image has been registered so give them the option to upload something
                  <div className="media-uploader_cta" onClick={() => open()}>
                    <div className="media-uploader_cta_image">
                      <Image
                        src="/assets/icons/add.svg"
                        alt="Add Image"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="p-14-medium">Upload Image</p>
                  </div>
                )}
              </div>
            )}
          </CldUploadWidget>

          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
          >
            Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MakePost;
