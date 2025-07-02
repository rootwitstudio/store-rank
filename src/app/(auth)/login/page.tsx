"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/stores/authStore";
import { Shield, ArrowLeft, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        return "Welcome back";
      case "otp":
        return "Enter verification code";
      case "link-sent":
        return "Check your email";
      default:
        return "Welcome back";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "email":
        return "Sign in to access your account and discover trusted stores";
      case "otp":
        return `We sent a 6-digit verification code to ${email}`;
      case "link-sent":
        return `We sent a secure login link to ${email}`;
      default:
        return "Sign in to access your account";
    }
  };

  return (
    <GoogleOAuthProvider clientId="1058001898765-8o2ho93b8j157ppr4jrmnuo95emch3i7.apps.googleusercontent.com">
      <div className="min-h-screen flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
          
          {/* Main Content */}
          <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
            <div className="max-w-md text-center">
              {/* Illustration */}
              <div className="mb-8 relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Abstract illustration representing trust and reviews */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform rotate-6 opacity-10"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl transform -rotate-3 opacity-20"></div>
                  <div className="absolute inset-8 bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-gray-100">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 font-semibold">Trusted Reviews</div>
                        <div className="text-xs text-gray-500">10,000+ verified stores</div>
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
              
              {/* Features */}
              <div className="mt-8 space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Verified store reviews and ratings</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Authentic customer experiences</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Trusted by 50,000+ users</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            {/* Logo for mobile */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <Shield className="h-6 w-6 text-white"/>
                </div>
                <span className="text-2xl font-bold text-gray-900">StoreRankly</span>
              </Link>
            </div>

            <Card className="border-0 shadow-none p-0">
              <CardHeader className="text-center lg:text-left px-0 pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {getStepTitle()}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {getStepDescription()}
                </p>
              </CardHeader>

              <CardContent className="px-0">
                {/* Error Message */}
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* Email Step */}
                {step === "email" && (
                  <form className="space-y-6" onSubmit={handleEmailSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email-address" className="text-sm font-medium text-gray-700">
                        Email address
                      </Label>
                      <Input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isLoading || isGoogleLoading}
                        className="h-12 text-base"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || isGoogleLoading}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Continue with Email"
                      )}
                    </Button>

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
                        <Button variant="outline" disabled className="w-full h-12">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing in with Google...
                        </Button>
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
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                        Verification code
                      </Label>
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        autoComplete="one-time-code"
                        required
                        maxLength={6}
                        disabled={isLoading}
                        className="h-12 text-center text-2xl tracking-widest font-mono"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleEditEmail}
                        disabled={isLoading}
                        className="flex-1 h-12"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Edit Email
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="flex-1 h-12 font-semibold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify & Sign In"
                        )}
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-sm font-medium p-0 h-auto"
                      >
                        {isResending ? "Resending..." : "Resend code"}
                      </Button>
                    </div>
                  </form>
                )}

                {/* Link Sent Step */}
                {step === "link-sent" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                        <Mail className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        We've sent a secure login link to your email address. Click the link in your email to sign in.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleEditEmail}
                      disabled={isLoading}
                      className="w-full h-12"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Edit Email
                    </Button>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-sm font-medium p-0 h-auto"
                      >
                        {isResending ? "Resending..." : "Resend link"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100">
                  Don't have an account?{" "}
                  <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}