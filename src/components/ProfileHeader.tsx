import React from "react";

interface ProfileHeaderProps {
  name: string;
  occupation?: string;
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, occupation, avatarUrl }) => (
  <div className="flex flex-col items-center py-6">
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={name}
        className="w-24 h-24 rounded-full shadow-lg mb-4 object-cover"
      />
    )}
    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
    {occupation && <p className="text-gray-500">{occupation}</p>}
  </div>
);

export default ProfileHeader;
