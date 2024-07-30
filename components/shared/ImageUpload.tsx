"use client";
import React from "react";
import { useToast } from "../ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type ImageUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const ImageUpload = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: ImageUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccess = (result: any) => {
    console.log(result);

    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    console.log("Image data above, if any");
    toast({
      title: "Post successfully made!",
      description: "Hopefully someone responds soon",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadError = () => {
    toast({
      title: "Something went wrong",
      description: "Please try again in a short while",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
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
          <h3 className="h3-bold text-dark-600">Original</h3>
          {/* This is what gets displayed after a successful Image upload */}
          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="userImage"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
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
  );
};

export default ImageUpload;
