import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <body className={font.className}>{children}</body>;
};

export default AuthLayout;
