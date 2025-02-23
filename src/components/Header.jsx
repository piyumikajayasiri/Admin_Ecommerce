import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Header = () => {
  return (
    <header className="bg-gradient-to-r bg-[#306A9F] shadow-lg">
      <div className="max-w-6xl flex mx-auto justify-between items-center p-3">
        <Link
          href="/"
          className="text-2xl font-extrabold group cursor-pointer "
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-md group-hover:from-blue-400 group-hover:to-blue-600">
            {" "}
            Auth
          </span>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
              <button className="bg-[#D0A7A7] px-5 py-2">
                <SignOutButton />
              </button>
            </SignedIn>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
