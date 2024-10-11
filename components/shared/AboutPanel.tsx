import React from "react";
import Image from "next/image";

type AboutPanelProps = {
  id: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  imageUrl: string;
  imageAlt: string;
};

// Component that actually manipulates the about page details and displays them
const AboutPanel = ({
  id,
  title,
  subtitle,
  bulletPoints,
  imageUrl,
  imageAlt,
}: AboutPanelProps) => {
  return (
    <section className="mx-auto my-10 flex max-w-xl flex-col rounded-3xl border-blue-200 px-4 py-10 text-gray-700 sm:border-4 sm:px-10 lg:max-w-screen-lg lg:flex-row bg-white">
      <div className="mr-2">
        <h2 className="mb-4 text-4xl font-medium text-black">{title}</h2>
        <p className="mb-6">{subtitle}</p>
        <div className="mb-4 space-y-4">
          {bulletPoints.map((bulletPoint) => (
            <div key={id} className="flex space-x-2">
              <span className="text-blue-400">•</span>
              <span className="font-medium">{bulletPoint}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-88">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={200}
          height={200}
          className="rounded-lg mt-24"
        />
      </div>
    </section>
  );
};

export default AboutPanel;
