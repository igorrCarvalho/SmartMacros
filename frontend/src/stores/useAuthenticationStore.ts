import { create } from "zustand";
import type { AuthenticationStore } from "../types";

export const useAuthenticationStore = create<AuthenticationStore>((set, get) => ({
    isAuth: false,
    token: "",
    email: "",
    password: "",
    isHydrated: false,
    logout: () => {
        set({
            isAuth: false,
            token: null,
            email: "",
            password: "",
        });
    },
    setIsHydrated: (isHydrated) => {
        set({ isHydrated });
    },
    setIsAuth: (isAuth) => {
        set({ isAuth });
    },
    setToken: (token) => {
        set({ token, isAuth: true });
    },
    setPassword: (password) => {
        set({ password });
    },
    setEmail: (email) => {
        set({ email });
    },
}));