import React from "react";

const AboutPage = () => {
  return (
    <div>
      Welcome!
      <div>This is the only page you can access without an account</div>
      <div>This page deals with explaining how the site works</div>
      <div>
        <h2>Tech Stack</h2>
        <p className="text-sm">Mongodb is used as the database</p>
        <p className="text-center text-white">
          Any posts and or transactions made are stored in the appropriate
          Mongodb collection
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
