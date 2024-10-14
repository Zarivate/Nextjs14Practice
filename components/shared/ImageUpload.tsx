"use client";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { deleteImage } from "@/lib/actions/image.actions";

type ImageUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any;
  publicId: string;
  handleImageDelete: () => void;
};

const ImageUpload = ({
  onValueChange,
  setImage,
  image,
  publicId,
  handleImageDelete,
}: ImageUploaderProps) => {
  const { toast } = useToast();
  const [submittingDelete, setSubmittingDelete] = useState(false);

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
        handleImageDelete();
        setImage((prevState: any) => ({
          ...prevState,
          publicId: null,
          width: null,
          height: null,
          secureUrl: null,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingDelete(false);
    }
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
                  width={getImageSize(image, "width")}
                  height={getImageSize(image, "height")}
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
              <p className="p-14-medium text-white">Upload Image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
