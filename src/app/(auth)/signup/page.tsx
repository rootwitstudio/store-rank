'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/stores/authStore";
import Link from "next/link";
import {Shield} from "lucide-react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register({
        email,
        password,
        name: `${firstName} ${lastName}`.trim(),
        role: "USER",
      });
      router.push("/login");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse: any) => {
    setIsGoogleLoading(true);
    setError("");
    try {
      const idToken = credentialResponse.credential;
      await googleLogin(idToken);
      router.push("/");
    } catch (err: any) {
      setError("Google sign up failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1058001898765-8o2ho93b8j157ppr4jrmnuo95emch3i7.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div
                      className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white"/>
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">StoreRankly</span>
                </Link>
              
                </div>
                <div className="mt-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign up</h1>
                  </div>
          <p className="text-gray-600 mb-6 text-center">Create a free StoreRank profile to smarter purchases and advanced reviews</p>
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-2">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                disabled={isLoading || isGoogleLoading}
                className="appearance-none rounded-lg block w-1/2 px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                disabled={isLoading || isGoogleLoading}
                className="appearance-none rounded-lg block w-1/2 px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              disabled={isLoading || isGoogleLoading}
              className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                disabled={isLoading || isGoogleLoading}
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base shadow-sm pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                disabled={isLoading || isGoogleLoading}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye-off SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                  // Eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating profile...
                </div>
              ) : (
                "Create my profile"
              )}
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="w-full">
            {isGoogleLoading ? (
              <div className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center text-gray-600">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up with Google...
                </div>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSignup}
                onError={() => setError('Google sign up failed')}
                width="100%"
                text="signup_with"
                shape="pill"
                theme="outline"
                logo_alignment="left"
              />
            )}
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
