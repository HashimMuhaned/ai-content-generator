import React from "react";
import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <UserProfile
        appearance={{
          elements: {
            card: "bg-white shadow-md rounded-lg px-6 py-4",
            header: "text-purple-700 font-bold text-xl mb-2",
            button:
              "bg-purple-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition-all",
            input:
              "border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500",
            footer: "text-gray-500 text-sm mt-4",
          },
        }}
      />
    </div>
  );
};

export default Settings;
