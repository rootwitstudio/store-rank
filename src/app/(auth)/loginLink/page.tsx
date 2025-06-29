"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/stores/authStore";
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function LoginLinkPage() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [error, setError] = useState("");
  const { verifyLoginLink } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleLinkVerification(token);
    } else {
      setStatus("error");
      setError("No verification token found in the link.");
    }
  }, [searchParams]);

  const handleLinkVerification = async (token: string) => {
    try {
      await verifyLoginLink(token);
      setStatus("success");
      // Redirect after a brief success message
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError("Invalid or expired login link. Please try logging in again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white"/>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">StoreRankly</span>
          </Link>
        </div>

        {/* Content based on status */}
        <div className="text-center space-y-6">
          {status === "verifying" && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Verifying your login</h2>
                <p className="mt-2 text-gray-600">Please wait while we verify your login link...</p>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Login successful!</h2>
                <p className="mt-2 text-gray-600">You have been successfully logged in. Redirecting you now...</p>
              </div>
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-indigo-600 animate-spin mr-2" />
                <span className="text-sm text-gray-500">Redirecting...</span>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Verification failed</h2>
                <p className="mt-2 text-red-600">{error}</p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="inline-flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Try logging in again
                </Link>
                <div>
                  <Link
                    href="/"
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Return to homepage
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 