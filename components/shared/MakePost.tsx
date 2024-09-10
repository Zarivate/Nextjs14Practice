"use client";
import React, { useState, useTransition } from "react";
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
  FormMessage,
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
import { TimeLimitKeys, debounce } from "@/lib/utils";
import { defaultValues2, postTimeLimits } from "@/constants";
import { InsufficientCreditsModal } from "@/components/shared/InsufficientCredits";
import { updateCredits } from "@/lib/actions/user.actions";
import { PostField } from "./PostField";
import ImageUpload from "./ImageUpload";

type ImageProps = {
  prevState: any;
  publicId: string;
  width: number;
  height: number;
  secureUrl: string;
};

type UserProps = {
  userId: string;
  creditBalance: number;
  userEmail: string;
  username: string;
};

const formSchema = z.object({
  postText: z
    .string()
    .min(2, {
      message: "Post must be at least 1 character long and no more than 700",
    })
    .max(700),
  timeChoice: z.string().optional(),
  publicId: z.string().optional(),
});

const MakePost = ({
  userId,
  creditBalance,
  userEmail,
  username,
}: UserProps) => {
  // Toast to display upon successful post creation
  const { toast } = useToast();

  // Use states to handle various properties that will be passed to make a post in the database
  const [timeToExpire, setTimeToExpire] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [userPost, setUserPost] = useState("");
  const [allowHome, setAllowHome] = useState(false);
  const [image, setImage] = useState<ImageProps>();
  const [isPending, startTransition] = useTransition();

  // Defined user form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postText: "",
      timeChoice: "",
      publicId: "",
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
          email: userEmail,
          username: username,
          postText: userPost,
          liveTime: timeToExpire,
          allowHome: allowHome,
          imageUrl: image?.publicId,
        }),
      });

      if (response.ok) {
        console.log("Success!");
        // Each post costs 1 credit, so subtract it from their current credits.
        startTransition(async () => {
          await updateCredits(userId, -1);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

    // Reset the fields
    form.reset(defaultValues2);

    toast({
      title: "Post made!",
      description: "Your post has succesfully been created.",
      duration: 3000,
      className: "success-toast",
    });
  };

  // Handler to update user input
  const onInputChangeHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    // Waits a second after user finishes typing before registering anything as opposed to immediately tracking every keystroke
    debounce(() => {
      setUserPost(value);
    }, 100)();

    return onChangeField(value);
  };

  // Handler for user expiration time choice
  const timeChoiceHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const timeChoice = postTimeLimits[value as TimeLimitKeys];
    setTimeToExpire(timeChoice.timeTL);
    // This is just so the change is actually reflected in the ui
    return onChangeField(value);
  };

  // Handler for whether user allows post to appear on home page or not
  const choicBoxHandler = () => {
    setAllowHome(!allowHome);
  };

  const handleImageDelete = () => {
    form.resetField("publicId");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createPost)} className="space-y-8">
          {creditBalance < 0 && <InsufficientCreditsModal />}
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
                    className="input-field "
                  />
                </FormControl>
                <FormDescription className="text-white">
                  This post gets sent to your profile by default but you can
                  also send it to the main home page by clicking the checkbox
                  below.
                </FormDescription>
                <FormMessage />
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
              <p className="text-sm text-white">
                If unchecked only you can see your post on your profile.
              </p>
            </div>
            <div className="px-10">
              <PostField
                control={form.control}
                name="timeChoice"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      timeChoiceHandler(value, field.onChange);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[250px] ">
                      <SelectValue placeholder="Select a time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(postTimeLimits).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="select-item"
                        >
                          {postTimeLimits[key as TimeLimitKeys].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              ></PostField>
            </div>
          </div>
          <PostField
            control={form.control}
            name="publicId"
            render={({ field }) => (
              <ImageUpload
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                handleImageDelete={handleImageDelete}
              />
            )}
          ></PostField>
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
