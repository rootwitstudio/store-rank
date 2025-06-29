// If you haven't already, run: yarn add zustand
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { authApi } from '@/lib/api';

const ACCESS_TOKEN = 'store-rank-token';
const USER_KEY = 'store-rank-user';

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  picture?: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string) => void;
  reset: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name?: string; role?: string }) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  sendLoginLink: (email: string) => Promise<void>;
  verifyLoginLink: (token: string) => Promise<void>;
  logout: () => void;
};

const cookieToken = Cookies.get(ACCESS_TOKEN);
const initialToken = cookieToken && cookieToken !== 'undefined' ? JSON.parse(cookieToken) : '';

const cookieUser = Cookies.get(USER_KEY);
const initialUser = cookieUser && cookieUser !== 'undefined' ? JSON.parse(cookieUser) : null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: initialUser,
  accessToken: initialToken,
  setUser: (user) => {
    if (user) {
      Cookies.set(USER_KEY, JSON.stringify(user));
    } else {
      Cookies.remove(USER_KEY);
    }
    set({ user });
  },
  setAccessToken: (accessToken) => {
    Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
    set({ accessToken });
  },
  reset: () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(USER_KEY);
    set({ user: null, accessToken: '' });
  },
  login: async (email, password) => {
    const response = await authApi.login({ email, password });
    const { user, token } = response;
    set({ user, accessToken: token });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
    Cookies.set(USER_KEY, JSON.stringify(user));
  },
  register: async (data) => {
    await authApi.register(data);
  },
  googleLogin: async (idToken) => {
    const response = await authApi.verifyGoogleAuth({ idToken });
    console.log('response login', response);
    const { user, token } = response;
    set({ user, accessToken: token });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
    Cookies.set(USER_KEY, JSON.stringify(user));
  },
  sendOtp: async (email) => {
    await authApi.sendOtp({ email });
  },
  verifyOtp: async (email, otp) => {
    const response = await authApi.verifyOtp({ email, otp });
    const { user, token } = response;
    set({ user, accessToken: token });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
    Cookies.set(USER_KEY, JSON.stringify(user));
  },
  sendLoginLink: async (email) => {
    await authApi.sendLoginLink({ email });
  },
  verifyLoginLink: async (token) => {
    const response = await authApi.verifyLoginLink(token);
    const { user, token: accessToken } = response;
    set({ user, accessToken });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
    Cookies.set(USER_KEY, JSON.stringify(user));
  },
  logout: () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(USER_KEY);
    set({ user: null, accessToken: '' });
  },
}));

export const useAuth = () => useAuthStore();
