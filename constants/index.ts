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
    label: `"Buy" Credits`,
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
];

export const templatePosts = [
  {
    key: 1,
    imageSampleUrl: "samples/landscapes/girl-urban-view",
    postText: "This isn't an actual post, it's all just one big template.",
  },
  {
    key: 2,
    imageSampleUrl: "samples/people/kitchen-bar",
    postText:
      "All these images come from built in samples cloudinary gives you when you use their media library and upload services.",
  },
  {
    key: 3,
    imageSampleUrl: "samples/animals/cat",
    postText:
      "If you're looking at this then congrats, you got past the blur feature wrapping the container.",
  },
  {
    key: 4,
    imageSampleUrl: "samples/landscapes/beach-boat",
    postText:
      "Sorry if you were expecting more, didn't go too hard on this cause it's just a basic demo.",
  },
  {
    key: 5,
    imageSampleUrl: "samples/landscapes/nature-mountains",
    postText: "Hope you're having an alright time so far though.",
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
    title: "Database",
    subtitle: `MongoDB was chosen for a variety of reason, besides just being fairly comfortable with it due to past projects
      it also perfectly fit the needs of the site.`,
    bulletPoints: [
      `Antithesis of the traditional Social Media Site, no need to track user metrics`,
      `Such tracking is often best suited
      for SQL based databases, this makes a NoSQL database like MongoDB ideal`,
      `Only things tracked can be handled through
      simple documents`,
      `Tracked items are limited to only users, posts, and any transactions made`,
    ],
    imageUrl: "/assets/images/mongodb_thumbnail.png",
    imageAlt: "MongoDBLogo",
  },
  {
    title: "FrontEnd + Backend",
    subtitle: `The framework I decided to go with was the React based NextJS, mainly due to it's ability to combine
    frontend and backend aspects together.`,
    bulletPoints: [
      `High familiarity with React and JS, making it easy to utilize and implement web and ui features`,
      `With the various services and webhooks involved in this app, being able to 
      create serverless backend routes was essential and easier for me with NextJS`,
      `From the database to when a user makes a post, I've made custom API routes within the
      NextJS project structure for each and every one`,
      `Such routes are also scalable and efficient if the need ever came to expand the site`,
      `Server-Side Rendering (SSR) and Staic Generation to optimize loading and performance`,
    ],
    imageUrl: "/assets/images/nextjs-icon.png",
    imageAlt: "NextJSLogo",
  },
  {
    title: "Deployment",
    subtitle: `Having used NextJS as the framework, Vercel was the obvious choice for handling deployment.`,
    bulletPoints: [
      `Vercel are the ones behind NextJS`,
      `This being the case, they have an easy ecosystem to quickly host NextJS based applications`,
      `Unoptimal for larger scale commercial projects, but sufficient for simple ones like this`,
    ],
    imageUrl: "/assets/images/Vercel-logo.png",
    imageAlt: "VercelLogo",
  },
  {
    title: "Payment",
    subtitle: `It's popularity and relative ease in setting up are the main reasons Stripe was chosen`,
    bulletPoints: [
      `Often found in e-commerce and or SAAS websites, meaning likely users would feel familiar`,
      `Easy monitoring of sales and checkout events with customizable webhooks`,
      `If anything goes wrong, a log history is available for developers`,
      `For this app, an event is triggered whenever a user "buys" credits that hits the appropriate endpoint`,
    ],
    imageUrl: "/assets/images/stripe-logo.png",
    imageAlt: "StripeLogo",
  },
  {
    title: "Image Upload",
    subtitle: `While a simple S3 bucket might've been preferable, Cloudinary was instead chosen.`,
    bulletPoints: [
      `Cloudinary offers many desirable adjustments for user uploaded content`,
      `Things like upscaling, background removal, auto video transcription, moderation, etc`,
      `All of these features have the ability to be implemented and leave the door open for
      future scaling of the site`,
      `At the moment only Cloudinary's generous free plan is being used to handle uploading images and videos`,
    ],
    imageUrl: "/assets/images/Cloudinary_logo.svg.png",
    imageAlt: "CloudinaryLogoLogo",
  },
  {
    title: "Authentication and User Management",
    subtitle: `Clerk's ease and flexibility in customizing the user 
    authentication process were the main reason it was chosen`,
    bulletPoints: [
      `Multilayered and detailed configuration available for signups.`,
      `From multi-factors to allowing users to connect through other socials.`,
      `Session and token time customization available, total and active users tracked as well`,
      `API and webhook endpoints were relatively easy to set up, with detailed event and general logs too`,
      `The ability to outright and quickly remove users that might be giving trouble is also nice.`,
    ],
    imageUrl: "/assets/images/clerk-logo.png",
    imageAlt: "ClerkLogo",
  },
];

export const creditFee = -1;

export interface PostTemplate {
  _id: string;
  userId: string;
  email: string;
  username: string;
  postText: string;
  expireAt: Date;
  allowHome: Boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  privacySet: Boolean;
}

export interface FullPostInterface extends PostTemplate {
  handleDeleteFeed: null | ((_id: string) => Promise<void>);
  updatePromptFeed: null | ((_id: string, postText: string) => Promise<void>);
}

export interface SideBarPass {
  isOpen: boolean;
  toggle: () => void;
}
