"use client";
import React, { useState } from "react";
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
import { useSession } from "@clerk/nextjs";
import { TimeLimitKeys, debounce } from "@/lib/utils";
import { defaultValues2, postTimeLimits } from "@/constants";
import { CustomField } from "@/components/shared/CustomField";

const formSchema = z.object({
  postText: z.string().min(1),
});

const Page = () => {
  // Grab the user session state so can apply user details to post
  const { session } = useSession();
  // Toast to display upon successful post creation
  const { toast } = useToast();

  // Use states to handle various properties that will be passed to make a post in the database
  const [timeToExpire, setTimeToExpire] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [userPost, setUserPost] = useState("");
  const [allowHome, setAllowHome] = useState(false);

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
    console.log(session);
    console.log(session?.user.username);
    console.log(session?.user.primaryEmailAddress?.emailAddress);
    console.log(timeToExpire);
    console.log(allowHome);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user.primaryEmailAddress?.emailAddress,
          username: session?.user.username,
          postText: userPost,
          liveTime: timeToExpire,
          allowHome: allowHome,
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
  };

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

  const choicBoxHandler = () => {
    setAllowHome(!allowHome);
  };

  return (
    <>
      <Header
        title={"Welcome to the main function of this site"}
        subtitle={
          "Ever wanted to let your thoughts out to the world but face none of the consequences? Well that's where this site comes in! Anything you post here gets auto sent to the void in a minute. This timeframe can be altered and or entirely removed if you want to save a post to your profile."
        }
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createPost)} className="space-y-8">
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
          <div className="media-uploader-field">Test Query</div>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
            onClick={() => {
              toast({
                title: "Success!",
                description: "Your post has been made!",
              });
            }}
          >
            Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Page;
