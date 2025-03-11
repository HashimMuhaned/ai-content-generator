import React, { useState } from "react";
import { Check, Copy } from "lucide-react"; // Ensure you're importing the right icon component
import { Button } from "@/components/ui/button"; // Update the import path if needed

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy); // Copy text to clipboard
    setIsCopied(true); // Set the state to "Copied"
    setTimeout(() => setIsCopied(false), 3000); // Reset to "Copy" after 3 seconds
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center gap-1 px-3 py-1 text-xs text-white"
    >
      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {isCopied ? "Copied" : "Copy"}
    </Button>
  );
};

export default CopyButton;
