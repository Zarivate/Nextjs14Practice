import { Dispatch, SetStateAction } from "react";

// This file holds a colletion of links to different parts of the site, to be adjusted later
export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
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
    label: "Shop",
    route: "/shop",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "About",
    route: "/about",
    icon: "/assets/icons/scan.svg",
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
  timeChoice: "",
  publicId: "",
};

export const AboutPanelsText = [
  {
    name: "Database",
    subtitle:
      "MongoDB was chosen for a variety of reason, besides just being fairly comfortable with it due to past projects",
  },
];

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
  imageUrl: string;
  privacySet: Boolean;
  handleDelete: (_id: string) => Promise<void>;
  updatePrompt: (_id: string, postText: string) => Promise<void>;
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
