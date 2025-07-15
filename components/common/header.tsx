import Image from "next/image"
import Link from "next/link"
import logo from '@/public/logo.png';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Searchbar from "../search-bar";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="font-bold shrink-0">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-24 lg:w-28"
          />
          </Link>
          <div className="lg:hidden">
            {/* Renders if you are sign in */}
            <SignedIn>
              <UserButton/>
            </SignedIn>

              {/* Renders the sign in button if you are sign out */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

          </div>
        </div>
        {/* Search bar */}
        <div className="w-full lg:max-w-2xl">
          <Searchbar/>
        </div>
      </div>
    </div>
  )
}

export default Header