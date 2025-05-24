"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-6 text-gray-400 hover:text-white"
      onClick={() => router.push("/")}
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      Back to Home
    </Button>
  );
}
