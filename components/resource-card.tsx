// components/resource-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type ResourceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function ResourceCard({ icon, title, description }: ResourceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow hover:border-[#0B3B2E]/50 group">
      <div className="flex items-start">
        <div className="bg-[#0B3B2E]/10 p-3 rounded-full mr-4 group-hover:bg-[#0B3B2E]/20 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
              View Online
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
              <Download size={16} className="mr-2" /> Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}