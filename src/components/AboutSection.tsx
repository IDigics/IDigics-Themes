import React from "react";

interface AboutSectionProps {
  about: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => (
  <section className="prose max-w-none text-gray-800 mt-4 mb-8 px-2">
    <h2 className="text-xl font-bold mb-2">À propos</h2>
    <p>{about}</p>
  </section>
);

export default AboutSection;
