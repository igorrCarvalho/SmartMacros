import { create } from "zustand";
import type { AuthenticationStore } from "../types";

export const useAuthenticationStore = create<AuthenticationStore>((set, get) => ({
    isAuth: false,
    email: "",
    setEmail: (email) => {
        set({ email });
    },
}));