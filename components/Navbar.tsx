import { LayoutDashboard, History, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo1.svg";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image src={Logo} alt="logo" width={40} height={40} />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <LayoutDashboard size={20} className="hidden md:block" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/history"
                  className="text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <History size={20} className="hidden md:block" />
                  <span>History</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Settings size={20} className="hidden md:block" />
                  <span>Settings</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <span>Login</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <span>Signup</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
