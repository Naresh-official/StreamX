"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export function AdminHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-right px-6 ">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.svg" alt="Admin" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </header>
  );
}
