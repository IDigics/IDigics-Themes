import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  initialTabId?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialTabId, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTabId || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button px-4 py-2 -mb-px font-medium border-b-2 transition-colors duration-200 focus:outline-none ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 active"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            data-tab={tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content mt-4">
        {/* Children or tab content will be rendered in parent */}
      </div>
    </div>
  );
};

export default Tabs;
