"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/loginPageBackground.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="p-8 rounded-md w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {!isLoading && (
              <div className="bg-white rounded-full p-1">
                <Image
                  src="/google-icon.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
            {isLoading ? "Signing In..." : "Sign in with Google"}
          </Button>
        </div>
      </div>
    </div>
  );
}
