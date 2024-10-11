import React from "react";
import Link from "next/link";

// Component that essentially functions as a 404 page, nothing special just some text and a link button to redirect you to the homepage
const NotFound = () => {
  return (
    <section className="mx-auto py-24">
      <div className="mx-auto flex w-full flex-col items-center justify-center sm:max-w-screen-sm md:max-w-screen-md lg:flex-row">
        <div className="text-center">
          <h2 className="bg-clip-text text-3xl font-extrabold text-white sm:text-5xl">
            Sorry
          </h2>
          <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
            That user doesn't exist
          </p>
          <Link
            href="/"
            className="shadow-pink-600/30 mt-10 inline-flex h-12 items-center rounded-full bg-pink-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-pink-600 hover:shadow-lg"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
