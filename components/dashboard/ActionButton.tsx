"use client";

import { Pen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Dialog";

type ActionButtonProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={onEdit}
        className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        aria-label="Edit"
      >
        <Pen size={16} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning!</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButton;