"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/stores/authStore";
import {Shield, ArrowLeft, Mail} from "lucide-react";

type AuthType = "otp" | "link";
type Step = "email" | "otp" | "link-sent";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [authType, setAuthType] = useState<AuthType>("otp");
  const [isResending, setIsResending] = useState(false);
  const { sendOtp, verifyOtp, sendLoginLink, googleLogin } = useAuth();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP. Please check your email address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await verifyOtp(email, otp);
      router.push("/");
    } catch (err) {
      setError("Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setIsResending(true);
    try {
      if (authType === "otp") {
        await sendOtp(email);
      } else {
        await sendLoginLink(email);
      }
      setError("");
    } catch (err) {
      if (authType === "otp") {
        setError("Failed to resend OTP. Please try again.");
      } else {
        setError("Failed to resend login link. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleEditEmail = () => {
    setStep("email");
    setOtp("");
    setError("");
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsGoogleLoading(true);
    setError("");
    try {
      const idToken = credentialResponse.credential;
      await googleLogin(idToken);
      router.push("/");
    } catch (err: any) {
      setError("Google login failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "email":
        return "Sign in to your account";
      case "otp":
        return "Enter verification code";
      case "link-sent":
        return "Check your email";
      default:
        return "Sign in to your account";
    }
  };

  return (
      <GoogleOAuthProvider clientId="1058001898765-8o2ho93b8j157ppr4jrmnuo95emch3i7.apps.googleusercontent.com">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
            {/* Engaging Top Section */}
            <div className="mb-8 text-center">
                <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div
                      className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white"/>
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">StoreRankly</span>
                </Link>

                <div className="mt-6">
                  <div className="flex items-center justify-center gap-4 mb-1">
                    <h1 className="text-lg font-medium text-gray-700">Read Reviews</h1>
                    <span className="text-gray-400">•</span>
                    <h1 className="text-lg font-medium text-gray-700">Write Reviews</h1>
                  </div>
                  <h1 className="text-lg font-medium text-indigo-600 mb-4">Find Trusted Brands</h1>
                  <h2 className="text-xl font-semibold text-gray-800 mt-6">
                    {getStepTitle()}
                  </h2>
                </div>
              <p className="mt-2 text-sm text-gray-600">
                {step === "otp" && (
                  <span>We sent a verification code to {email}</span>
                )}
                {step === "link-sent" && (
                  <span>We sent a login link to {email}</span>
                )}
              </p>
            </div>

            {/* Email Step */}
            {step === "email" && (
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-2">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                )}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isLoading || isGoogleLoading}
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || isGoogleLoading}
                    className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    "Continue with Email"
                  )}
                </button>
              </form>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-2">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                )}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="otp" className="sr-only">
                      Verification code
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        autoComplete="one-time-code"
                        required
                        maxLength={6}
                        disabled={isLoading}
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-center text-2xl tracking-widest"
                        placeholder="Enter code to login"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                      type="button"
                      onClick={handleEditEmail}
                      disabled={isLoading}
                      className="flex-1 group relative flex justify-center py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Edit Email
                  </button>
                  <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="flex-1 group relative flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </div>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? "Resending..." : "Resend code"}
                  </button>
                </div>
              </form>
            )}

            {/* Link Sent Step */}
            {step === "link-sent" && (
              <div className="space-y-6">
                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-2">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                )}

                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    We've sent a secure login link to your email address. Click the link in your email to sign in.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                      type="button"
                      onClick={handleEditEmail}
                      disabled={isLoading}
                      className="flex-1 group relative flex justify-center py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Edit Email
                  </button>
                </div>

                <div className="text-center">
                  <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? "Resending..." : "Resend link"}
                  </button>
                </div>
              </div>
            )}

            {/* Google Sign In Button at Bottom - Only show on email step */}
            {step === "email" && (
              <div className="mt-8 flex flex-col items-center">
                <span className="text-gray-500 text-sm mb-3">or</span>
                <div className="w-full">
                  {isGoogleLoading ? (
                    <div className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex items-center text-gray-600">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.372 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in with Google...
                      </div>
                    </div>
                  ) : (
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => setError('Google login failed')}
                        useOneTap
                        width="100%"
                        text="signin_with"
                        shape="pill"
                        theme="outline"
                        logo_alignment="left"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
  );
}
