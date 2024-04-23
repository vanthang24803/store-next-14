import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import { User } from "@/types";
import toast from "react-hot-toast";
import _http from "@/utils/http";

type Store = {
  checkExpiry(): unknown;
  user: User | null;
  token: string;
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (token: string | undefined) => void;
  logout: () => void;
  verifyEmail: (userId: string | null, token: string | null) => void;
};

const useAuth = create(
  persist<Store>(
    (set, get) => ({
      user: null,
      token: "",
      isLogin: false,
      login: async (email, password) => {
        try {
          const response = await _http.post(`/api/auth/login`, {
            email: email,
            password: password,
          });

          if (response.status === 200) {
            set({
              user: response.data.user,
              token: response.data.token,
              isLogin: true,
            });

            Cookies.set("token", response.data.token);
            Cookies.set("roles", response.data.user.role);
          }
        } catch (error: any) {
          console.error("Login failed:", error);
          if (error.response && error.response.status === 400) {
            toast.error("Tài khoản hoặc mật khẩu không chính xác" , {
              style : {
                fontSize : "14px"
              }
            });
          }
          throw error;
        }
      },

      signInWithGoogle(token) {
        if (token) {
          _http
            .post(`/api/auth/google?token=${token}`)
            .then((response) => {
              set({
                user: response.data.user,
                token: response.data.token,
                isLogin: true,
              });

              Cookies.set("token", response.data.token);
              Cookies.set("roles", response.data.user.role);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      checkExpiry: () => {
        const token = get().token;
        if (token) {
          const json = jwt.decode(token);
          if (typeof json !== "string" && json?.exp) {
            if (Date.now() >= json.exp * 1000) {
              get().logout();
            }
          }
        }
      },
      logout: () => {
        set({ user: null, token: "", isLogin: false });
        Cookies.remove("token");
        Cookies.remove("roles");
        window.location.reload();
      },
      verifyEmail: (userId, token) => {
        _http
          .get(`/api/auth/verify-account?userId=${userId}&token=${token}`)
          .then((response) => {
            set({
              user: response.data.user,
              token: response.data.token,
              isLogin: true,
            });

            Cookies.set("token", response.data.token);
            Cookies.set("roles", response.data.user.role);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
