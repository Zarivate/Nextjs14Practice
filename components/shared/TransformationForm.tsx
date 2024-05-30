"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { Input } from "@/components/ui/input";
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { CustomField } from "./CustomField";
import { AspectRatioKey } from "@/lib/utils";

// Handles the types of  input fields and their validation
export const formSchema = z.object({
  title: z.string(),
  aspectRation: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
}: TransformationFormProps) => {
  // Grab the type of image alteration a user wants to do
  const transformationType = transformationTypes[type];

  // TODO: Implement proper image uploading. For now just store the image data
  const [image, setImage] = useState(data);

  // Store the image transformation
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);

  // To account for the possibility of someone editing an image instead of creating a new one, checks to see if there is any exisiting data first
  // before grabbing the data fields.
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    console.log("This has to be implemented still, silly");
  };

  // Handles user attempting to change an image
  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    console.log(fieldName);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"></form>
      {/* All the passed in props get passed to the render field and spread out, proper assignment of values is handled by the CustomField component */}
      <CustomField
        control={form.control}
        name="title"
        formLabel="Image Title"
        className="w-full"
        render={({ field }) => <Input {...field} className="input-field" />}
      />

      {/* The drop down menu only appears if the user is on the "fill" page */}
      {type === "fill" && (
        <CustomField
          control={form.control}
          name="aspectRatio"
          FormLabel="Aspect Ratio"
          className="w-full"
          render={({ field }) => (
            //
            <Select
              onValueChange={(value) =>
                onSelectFieldHandler(value, field.onChange)
              }
            >
              <SelectTrigger className="select-field">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {/* Dynamically import the aspect ratio options, map over them and pass them to the Select Item component */}
                {Object.keys(aspectRatioOptions).map((key) => (
                  <SelectItem key={key} value={key} className="select-item">
                    {aspectRatioOptions[key as AspectRatioKey].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}

      {/* Handle the case where the user is on the remove or recolor option page */}
      {(type === "remove" || type === "recolor") && (
        <div className="prompt-field">
          <CustomField
            control={form.control}
            name="prompt"
            formLabel={
              type === "remove" ? "object to remove" : "Object to recolor"
            }
            className="w-full"
            render={({ field }) => (
              <Input
                value={field.value}
                className="input-field"
                onChange={(e) =>
                  onInputChangeHandler(
                    "prompt",
                    e.target.value,
                    type,
                    field.onChange
                  )
                }
              />
            )}
          />
        </div>
      )}
    </Form>
  );
};

export default TransformationForm;
