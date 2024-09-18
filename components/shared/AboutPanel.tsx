import React from "react";
import Image from "next/image";

const AboutPanel = ({ title, subtitle }: any) => {
  return (
    <section className="mx-auto my-10 flex max-w-xl flex-col rounded-3xl border-gray-500 px-4 py-10 text-gray-700 sm:border-8 sm:px-10 lg:max-w-screen-lg lg:flex-row bg-white">
      <div className="mr-2">
        <h2 className="mb-4 text-4xl font-medium">{title}</h2>
        <p className="mb-6">{subtitle}</p>
        <div className="mb-4 space-y-4">
          <div className="flex space-x-2">
            <span className="text-blue-400">•</span>
            <span className="font-medium">New Puzzles Everyday</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-blue-400">•</span>
            <span className="font-medium">Daily Activities</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-blue-400">•</span>
            <span className="font-medium">Weekly Competitions</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-blue-400">•</span>
            <span className="font-medium">Challenges and Quizzes</span>
          </div>
        </div>
        <div className="text-gray-400">and more...</div>
      </div>
      <div className="h-88">
        <Image
          src="/assets/images/mongodb_thumbnail.png"
          alt="MongoDB"
          width={200}
          height={200}
          className="rounded-lg mt-24"
        />
      </div>
    </section>
  );
};

export default AboutPanel;
