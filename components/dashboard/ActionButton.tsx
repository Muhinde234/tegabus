// components/ui/ActionButton.tsx
"use client";

import { Pen, Trash2 } from "lucide-react";

type ActionButtonProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      
      <button
        onClick={onEdit}
        className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        aria-label="Edit"
      >
        <Pen size={16} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default ActionButton;
