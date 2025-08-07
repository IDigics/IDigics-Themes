import React from "react";

interface ProfileLinksProps {
  links: { href: string; label: string; icon?: React.ReactNode }[];
}

const ProfileLinks: React.FC<ProfileLinksProps> = ({ links }) => (
  <div className="flex flex-wrap gap-3 justify-center mt-2 mb-4">
    {links.map((link, i) => (
      <a
        key={i}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium shadow-sm transition"
      >
        {link.icon}
        {link.label}
      </a>
    ))}
  </div>
);

export default ProfileLinks;
