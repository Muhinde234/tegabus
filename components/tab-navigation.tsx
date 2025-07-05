
"use client";

import { Mail, HelpCircle, FileText } from "lucide-react";

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "contact", label: "Contact Support", icon: <Mail size={16} /> },
    { id: "faq", label: "Admin FAQs", icon: <HelpCircle size={16} /> },
    { id: "resources", label: "Resources", icon: <FileText size={16} /> },
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-4 px-6 text-sm font-medium transition-all flex items-center relative ${
            activeTab === tab.id
              ? "text-[#0B3B2E]"
              : "text-gray-600 hover:text-[#0B3B2E] hover:bg-gray-50"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0B3B2E]"></span>
          )}
        </button>
      ))}
    </div>
  );
}