"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCredLoading, setIsCredLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    // TODO: Add actual Google sign-up logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/"); // redirect after signup
    }, 1500);
  };

  const handleCredentialSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsCredLoading(true);
    // TODO: Add actual credential signup logic here
    setTimeout(() => {
      setIsCredLoading(false);
      router.push("/"); // redirect after signup
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

      {/* Signup Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="p-8 rounded-md w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

          {/* Email/Password Signup */}
          <form className="space-y-4 mb-6" onSubmit={handleCredentialSignup}>
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
              autoComplete="new-password"
              disabled={isCredLoading}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={isCredLoading}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={isCredLoading}>
              {isCredLoading ? "Signing Up..." : "Sign up with Email"}
            </Button>
          </form>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignUp}
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
            {isLoading ? "Signing Up..." : "Sign up with Google"}
          </Button>

          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
