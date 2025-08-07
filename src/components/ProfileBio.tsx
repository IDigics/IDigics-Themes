import React from "react";

interface ProfileBioProps {
  bio: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => (
  <div className="prose max-w-none text-gray-800">
    {bio}
  </div>
);

export default ProfileBio;
