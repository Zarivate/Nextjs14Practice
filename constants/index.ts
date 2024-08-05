import { Dispatch, SetStateAction } from "react";

// This file holds a colletion of links to different parts of the site, to be adjusted later
export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Make A Post",
    route: "/post",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Shop",
    route: "/shop",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },

  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const postTimeLimits = {
  "Don't Save": {
    label: "Don't Save",
    timeTL: 0,
  },
  "1 Minute": {
    label: "1 Minute",
    timeTL: 60,
  },
  "2 Minutes": {
    label: "2 Minutes",
    timeTL: 120,
  },
  "1 hour": {
    label: "1 hour",
    timeTL: 3600,
  },
  "1 day": {
    label: "1 day",
    timeTL: 86400,
  },
  "1 year": {
    label: "1 year",
    timeTL: 31536000,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const defaultValues2 = {
  postText: "",
};

export const creditFee = -1;

export interface UserPost {
  userId: string;
  email: string;
  username: string;
  postText: string;
  expireAt: Date;
  allowHome: Boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  privacySet: Boolean;
  handleDelete: (_id: string) => Promise<void>;
  updatePrompt: (_id: string, postText: string) => Promise<void>;
}

export interface BasicPost {
  userId: "test";
  email: "test@mail.com";
  username: "zari";
  postText: "Bleh";
  expireAt: "Today";
  allowHome: true;
  _id: "1234";
  handleDelete: (_id: string) => Promise<void>;
  updatePrompt: (_id: string, postText: string) => Promise<void>;
}
export interface TestPostInterface {
  userId: string;
  email: string;
  username: string;
  postText: string;
  expireAt: Date;
  allowHome: Boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  privacySet: Boolean;
  handleDeleteFeed: (_id: string) => Promise<void>;
  updatePromptFeed: (_id: string, postText: string) => Promise<void>;
}
export interface TestPostInterface2 {
  userId: string;
  email: string;
  username: string;
  postText: string;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
  allowHome: Boolean;
  _id: string;
  imageUrl: string;
  privacySet: Boolean;
}

// This is to handle the types for an unknown user's profile
export interface TestPostInterface3 {
  profilePosts: TestPostInterface2[];
  handleDelete: (_id: string) => Promise<void>;
}

export interface TestPostInterface4 {
  userId: string;
  email: string;
  username: string;
  postText: string;
  _id: string;
  handleDelete: (_id: string) => Promise<void>;
}

export interface UserPostsArray {
  posts: UserPost[];
}

export interface UserPostsArray2 {
  posts: TestPostInterface2[];
}

export interface SideBarPass {
  isOpen: boolean;
  toggle: () => void;
}
