"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCredLoading, setIsCredLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    // TODO: Add actual Google sign-in logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/"); // redirect after login
    }, 1500);
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCredLoading(true);

    // TODO: Add actual credential login logic here
    setTimeout(() => {
      setIsCredLoading(false);
      router.push("/"); // redirect after login
    }, 1500);
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

          {/* Email/Password Login */}
          <form className="space-y-4 mb-6" onSubmit={handleCredentialLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isCredLoading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isCredLoading}
            />
            <Button type="submit" className="w-full" disabled={isCredLoading}>
              {isCredLoading ? "Signing In..." : "Sign in with Email"}
            </Button>
          </form>

          {/* Google Sign In */}
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

          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              New to StreamX?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
