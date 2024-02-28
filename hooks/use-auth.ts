import axios from "axios";
import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

import { User } from "@/types";

type Store = {
  user: User | null;
  token: string;
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const useAuth = create(
  persist<Store>(
    (set, get) => ({
      user: null,
      token: "",
      isLogin: false,
      login: async (email, password) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            set({
              user: response.data.user,
              token: response.data.token,
              isLogin: true,
            });

            Cookies.set("token", response.data.token);
            Cookies.set("roles", response.data.user.role);
          }
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: "", isLogin: false });
        Cookies.remove("token");
        Cookies.remove("roles");
        window.location.reload();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
