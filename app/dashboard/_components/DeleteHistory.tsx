import React, { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DelteteItemDialog from "./DeleteItemDialog";

interface DeleteHistoryProps {
  id: string;
  deleteHistoryItem: (id: string) => void;
}

const DeleteHistory: React.FC<DeleteHistoryProps> = ({
  id,
  deleteHistoryItem,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-700 flex items-center bg-white hover:bg-red-50"
      >
        <Trash size={16} />
      </Button>
      <DelteteItemDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => deleteHistoryItem(id)}
      />
    </div>
  );
};

export default DeleteHistory;
