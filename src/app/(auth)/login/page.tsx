"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/stores/authStore";
import { Shield, ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
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
        return "Welcome back";
      case "otp":
        return "Enter verification code";
      case "link-sent":
        return "Check your email";
      default:
        return "Welcome back";
    }
  };

  return (
    <GoogleOAuthProvider clientId="1058001898765-8o2ho93b8j157ppr4jrmnuo95emch3i7.apps.googleusercontent.com">
      <div className="min-h-screen flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/40 rounded-full blur-lg"></div>
          
          {/* Main Content */}
          <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
            <div className="max-w-md text-center">
              {/* Illustration Placeholder */}
              <div className="mb-8 relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Abstract illustration representing trust and reviews */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform rotate-6 opacity-20"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl transform -rotate-3 opacity-30"></div>
                  <div className="absolute inset-8 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <div className="space-y-2">
                        <div className="flex justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Trusted Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Discover Trusted Stores
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of users who trust StoreRankly to find reliable businesses and share authentic reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            {/* Logo for mobile */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <Shield className="h-6 w-6 text-white"/>
                </div>
                <span className="text-2xl font-bold text-gray-900">StoreRankly</span>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-gray-600">
                {step === "email" && "Sign in to access your account"}
                {step === "otp" && `We sent a verification code to ${email}`}
                {step === "link-sent" && `We sent a login link to ${email}`}
              </p>
            </div>

            {/* Email Step */}
            {step === "email" && (
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isLoading || isGoogleLoading}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Google Sign In */}
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
                      width="100%"
                      text="signin_with"
                      shape="pill"
                      theme="outline"
                      logo_alignment="left"
                    />
                  )}
                </div>
              </form>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-center text-2xl tracking-widest"
                      placeholder="Enter 6-digit code"
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
                    className="flex-1 group relative flex justify-center py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Edit Email
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="flex-1 group relative flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We've sent a secure login link to your email address. Click the link in your email to sign in.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleEditEmail}
                    disabled={isLoading}
                    className="flex-1 group relative flex justify-center py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isResending ? "Resending..." : "Resend link"}
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}