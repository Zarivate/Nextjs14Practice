import Header from "@/components/shared/Header";
import React from "react";
import { AboutPanelsText } from "@/constants";
import AboutPanel from "@/components/AboutPanel";

// Page that handles displaying information about the application. Nothing too complicated,
// just maps out and displays hard coded information with a separate component.
const AboutPage = () => {
  return (
    <div>
      <Header
        title="Welcome!"
        subtitle={`This is the only page you can access without an account. And details how 
          all the technology used to build the site was chosen and what they handle.`}
      />
      {AboutPanelsText.map((aboutPanel) => (
        <AboutPanel
          key={aboutPanel.id}
          id={aboutPanel.id}
          title={aboutPanel.title}
          subtitle={aboutPanel.subtitle}
          bulletPoints={aboutPanel.bulletPoints}
          imageUrl={aboutPanel.imageUrl}
          imageAlt={aboutPanel.imageAlt}
        />
      ))}
    </div>
  );
};

export default AboutPage;
