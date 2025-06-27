"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "@/stores/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      await googleLogin(idToken);
      router.push("/");
    } catch (err: any) {
      setError("Google login failed");
    }
  };

  return (
      <GoogleOAuthProvider clientId="1058001898765-8o2ho93b8j157ppr4jrmnuo95emch3i7.apps.googleusercontent.com">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
            {/* Engaging Top Section */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Read Reviews</h1>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Write Reviews</h1>
              <h1 className="text-3xl font-extrabold text-indigo-600 mb-4">Find Trusted Brands</h1>
              <h2 className="text-xl font-semibold text-gray-800 mt-6">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  create a new account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base shadow-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base shadow-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                  type="submit"
                  className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition"
              >
                Sign in
              </button>
            </form>
            {/* Google Sign In Button at Bottom */}
            <div className="mt-8 flex flex-col items-center">
              <span className="text-gray-500 text-sm mb-3">or</span>
              <div className="w-full">
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
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
  );
}
