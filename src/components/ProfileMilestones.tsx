import React from "react";

interface Milestone {
  date: string;
  title: string;
  description?: string;
}

interface ProfileMilestonesProps {
  milestones: Milestone[];
}

const ProfileMilestones: React.FC<ProfileMilestonesProps> = ({ milestones }) => (
  <ul className="timeline list-none pl-0">
    {milestones.map((m, i) => (
      <li key={i} className="mb-6">
        <div className="font-semibold text-blue-700">{m.date}</div>
        <div className="font-bold text-lg">{m.title}</div>
        {m.description && <div className="text-gray-600">{m.description}</div>}
      </li>
    ))}
  </ul>
);

export default ProfileMilestones;
