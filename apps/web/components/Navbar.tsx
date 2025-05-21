"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@workspace/ui/components/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-red-600">StreamX</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Top 5 popular genres */}
            <Link
              href="/movies/action"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Action
            </Link>
            <Link
              href="/movies/comedy"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Comedy
            </Link>
            <Link
              href="/movies/drama"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Drama
            </Link>
            <Link
              href="/movies/thriller"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Thriller
            </Link>
            <Link
              href="/movies/romance"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Romance
            </Link>

            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium hover:text-gray-300 transition flex items-center gap-1">
                More
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-gray-800">
                <DropdownMenuItem>
                  <Link href="/movies/adventure">Adventure</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/animation">Animation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/biography">Biography</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/crime">Crime</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/documentary">Documentary</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/family">Family</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/fantasy">Fantasy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/history">History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/horror">Horror</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/musical">Musical</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/mystery">Mystery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/sci-fi">Sci-Fi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/sport">Sport</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movies/war">War</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Right Side - Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form
                className="flex items-center bg-black/60 border border-gray-700 rounded-md overflow-hidden"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.querySelector(
                    'input[type="search"]'
                  ) as HTMLInputElement;
                  if (input && input.value.trim()) {
                    router.push(
                      `/search?query=${encodeURIComponent(input.value.trim())}`
                    );
                    input.value = "";
                    setShowSearch(false);
                  }
                }}
              >
                <Search className="h-4 w-4 ml-2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Titles, people, genres"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1 hover:bg-transparent"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-black/90 border-gray-800"
            >
              <DropdownMenuItem className="focus:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span>Profile 1</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-800">
                Manage Profiles
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="focus:bg-gray-800">
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-800">
                Help Center
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="focus:bg-gray-800">
                Sign out of StreamX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
