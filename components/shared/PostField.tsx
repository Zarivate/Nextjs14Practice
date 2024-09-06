import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

const formSchema3 = z.object({
  timeChoice: z.string().optional(),
  publicId: z.string().optional(),
  postText: z.string(),
});

type PostFieldProps = {
  control: Control<z.infer<typeof formSchema3>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema3>;
  formLabel?: string;
  className?: string;
};

// This file is in charge of altering the user form with the corresponding page's content, to make it more reusable
export const PostField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: PostFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
