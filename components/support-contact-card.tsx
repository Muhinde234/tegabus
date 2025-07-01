
"use client";

import { Button } from "@/components/ui/button";


type SupportContactCardProps = {
  icon: React.ReactNode;
  title: string;
  contact: string;
  description: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
};

export function SupportContactCard({
  icon,
  title,
  contact,
  description,
  buttonText,
  buttonIcon,
}: SupportContactCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#0B3B2E]/5 to-[#1A936F]/5 p-6 rounded-lg border border-[#0B3B2E]/10">
      <div className="flex items-start mb-4">
        <div className="bg-[#0B3B2E]/10 p-2 rounded-full mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-[#0B3B2E]">{title}</h3>
          <p className="text-sm text-gray-600">{contact}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <Button variant="outline" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10 w-full">
        {buttonIcon} {buttonText}
      </Button>
    </div>
  );
}