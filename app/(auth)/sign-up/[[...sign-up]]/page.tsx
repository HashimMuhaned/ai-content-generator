import { SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="mb-8 p-6 w-full max-w-md bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>
        <SignUp
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
      <div>
        <Link href={"/"}>
          <Button className="w-full py-6 text-white">
            <ArrowLeft /> Back to Home Screen
          </Button>
        </Link>
      </div>
    </div>
  );
}
