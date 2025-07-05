
"use client";

import { Button } from "@/components/ui/button";

type SystemToolButtonProps = {
  icon: React.ReactNode;
  label: string;
};

export function SystemToolButton({ icon, label }: SystemToolButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="border-gray-300 h-24 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#0B3B2E]/30"
    >
      <div className="bg-[#0B3B2E]/10 p-3 rounded-full mb-2">
        {icon}
      </div>
      <span>{label}</span>
    </Button>
  );
}