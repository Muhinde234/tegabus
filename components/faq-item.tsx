
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
};

export function FAQItem({ question, answer, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#0B3B2E]/50 transition-colors">
      <button
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 text-gray-600 bg-gray-50 border-t border-gray-200">
          <p className="mb-3">{answer}</p>
          <Button variant="outline" size="sm" className="border-[#0B3B2E] text-[#0B3B2E] hover:bg-[#0B3B2E]/10">
            Related Documentation
          </Button>
        </div>
      )}
    </div>
  );
}