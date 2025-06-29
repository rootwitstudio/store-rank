// If you haven't already, run: yarn add zustand
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { authApi } from '@/lib/api';

const ACCESS_TOKEN = 'store-rank-token';

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
  logout: () => void;
};

const cookieToken = Cookies.get(ACCESS_TOKEN);
const initialToken = cookieToken && cookieToken !== 'undefined' ? JSON.parse(cookieToken) : '';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: initialToken,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => {
    Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
    set({ accessToken });
  },
  reset: () => {
    Cookies.remove(ACCESS_TOKEN);
    set({ user: null, accessToken: '' });
  },
  login: async (email, password) => {
    const response = await authApi.login({ email, password });
    const { user, token } = response;
    set({ user, accessToken: token });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
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
  },
  sendOtp: async (email) => {
    await authApi.sendOtp({ email });
  },
  verifyOtp: async (email, otp) => {
    const response = await authApi.verifyOtp({ email, otp });
    const { user, token } = response;
    set({ user, accessToken: token });
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
  },
  logout: () => {
    Cookies.remove(ACCESS_TOKEN);
    set({ user: null, accessToken: '' });
  },
}));

export const useAuth = () => useAuthStore();
