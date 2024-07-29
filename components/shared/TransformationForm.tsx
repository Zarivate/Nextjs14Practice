"use client";
import React, { useState, useTransition } from "react";
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
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import ImageUpload from "./ImageUpload";

// Handles the types of  input fields and their validation
export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
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
  config = null,
}: TransformationFormProps) => {
  // Grab the type of image alteration a user wants to do
  const transformationType = transformationTypes[type];
  // TODO: Implement proper image uploading. For now just store the image data
  const [image, setImage] = useState(data);
  // Store the image transformation
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  // Use state to handle whether or not someone has already pressed the submit button/is submiting something
  const [submitting, setSubmitting] = useState(false);
  // Use state to handle whether an image is being altered at the moment
  const [transforming, setTransforming] = useState(false);
  // use state to handle the configuration of a transformation
  const [transformationConfig, setTransformationConfig] = useState(config);
  // Transition hook to help update state without blocking UI
  const [isPending, startTransition] = useTransition();

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

  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Submit handler for the Generative Fill page
  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    // Grab the chosen aspect ratio
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    // Set the transformation to the data input fields the user set on the page
    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  // Submit handler for object remove and recolor option page
  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    // Takes in type function that accepts a value of type string and returns void
    onChangeField: (value: string) => void
  ) => {
    // Waits a second after user finishes typing before registering anything as opposed to immediately tracking every keystroke
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
      return onChangeField(value);
    }, 1000);
  };

  // Handles submitting a transformation
  const onTransformHandler = async () => {
    setTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);

    startTransition(async () => {
      // This will handle updating the user balance once those properties are implemented
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            formLabel="Aspect Ratio"
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
                type === "remove" ? "Object to remove" : "Object to recolor"
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
            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <ImageUpload
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
        </div>

        {/* Button to apply the transformation */}
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            // Just to ensure people don't spam the submit button
            disabled={transforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {transforming ? "Transforming..." : "Apply transformation"}
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
