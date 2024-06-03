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
import { Input } from "@/components/ui/input";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";

const formSchema = z.object({
  postText: z.string().min(1),
});

const page = () => {
  const { session } = useSession();
  const [timeToExpire, setTimeToExpire] = useState(60);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postText: "",
    },
  });

  const createPost = async () => {
    setSubmitting(true);
    console.log(session);
    console.log(session?.user.username);
    console.log(session?.user.primaryEmailAddress?.emailAddress);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user.primaryEmailAddress?.emailAddress,
          username: session?.user.username,
          postText: userPost,
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
  };

  const testData = () => {
    console.log(
      userPost,
      session?.user.primaryEmailAddress?.emailAddress,
      session?.user.username
    );
  };

  // Handler to update user input
  const onInputChangeHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    // Waits a second after user finishes typing before registering anything as opposed to immediately tracking every keystroke
    debounce(() => {
      setUserPost(value);
      console.log(userPost);
    }, 100)();

    return onChangeField(value);
  };

  // Use state to handle whether or not someone has already pressed the submit button/so they don't spam it
  const [submitting, setSubmitting] = useState(false);

  const [userPost, setUserPost] = useState("");

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
                <FormLabel>Your Post</FormLabel>
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

export default page;
