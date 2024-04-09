import { Navbar } from "./new-post/_components/navbar";
import { ToastProvider } from "@/components/provider/toater-provider";

export async function generateMetadata() {
  return { title: "Viết Blog" };
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <ToastProvider />
      <div className="mt-16 px-8">{children}</div>
    </main>
  );
};

export default LoginLayout;
