// If you haven't already, run: yarn add zustand
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { authApi } from '@/lib/api';

const ACCESS_TOKEN = 'store-rank-token';
const USER_KEY = 'store-rank-user';

export type UserRole = 'USER' | 'BUSINESS' | 'ADMIN';

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  picture?: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string) => void;
  reset: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name?: string; role?: UserRole }) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  sendLoginLink: (email: string) => Promise<void>;
  verifyLoginLink: (token: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
};

// Safe initialization that works on both server and client
const getInitialToken = () => {
  if (typeof window === 'undefined') return '';
  try {
    const cookieToken = Cookies.get(ACCESS_TOKEN);
    return cookieToken && cookieToken !== 'undefined' ? JSON.parse(cookieToken) : '';
  } catch (error) {
    return '';
  }
};

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const cookieUser = Cookies.get(USER_KEY);
    return cookieUser && cookieUser !== 'undefined' ? JSON.parse(cookieUser) : null;
  } catch (error) {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  accessToken: getInitialToken(),
  setUser: (user) => {
    if (typeof window === 'undefined') return;
    if (user) {
      Cookies.set(USER_KEY, JSON.stringify(user));
    } else {
      Cookies.remove(USER_KEY);
    }
    set({ user });
  },
  setAccessToken: (accessToken) => {
    if (typeof window === 'undefined') return;
    Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
    set({ accessToken });
  },
  reset: () => {
    if (typeof window === 'undefined') return;
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(USER_KEY);
    set({ user: null, accessToken: '' });
  },
  initialize: () => {
    if (typeof window === 'undefined') return;
    set({ 
      user: getInitialUser(),
      accessToken: getInitialToken()
    });
  },
  login: async (email, password) => {
    const response = await authApi.login({ email, password });
    const { user, token } = response;
    set({ user, accessToken: token });
    if (typeof window !== 'undefined') {
      Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
      Cookies.set(USER_KEY, JSON.stringify(user));
    }
  },
  register: async (data) => {
    await authApi.register(data);
  },
  googleLogin: async (idToken) => {
    const response = await authApi.verifyGoogleAuth({ idToken });
    console.log('Login response login', response);
    const { user, token } = response;
    set({ user, accessToken: token });
    if (typeof window !== 'undefined') {
      Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
      Cookies.set(USER_KEY, JSON.stringify(user));
    }
  },
  sendOtp: async (email) => {
    await authApi.sendOtp({ email });
  },
  verifyOtp: async (email, otp) => {
    const response = await authApi.verifyOtp({ email, otp });
    const { user, token } = response;
    set({ user, accessToken: token });
    if (typeof window !== 'undefined') {
      Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
      Cookies.set(USER_KEY, JSON.stringify(user));
    }
  },
  sendLoginLink: async (email) => {
    await authApi.sendLoginLink({ email });
  },
  verifyLoginLink: async (token) => {
    const response = await authApi.verifyLoginLink(token);
    const { user, token: accessToken } = response;
    set({ user, accessToken });
    if (typeof window !== 'undefined') {
      Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
      Cookies.set(USER_KEY, JSON.stringify(user));
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(USER_KEY);
    }
    set({ user: null, accessToken: '' });
  },
}));

export const useAuth = () => useAuthStore();
