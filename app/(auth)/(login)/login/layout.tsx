import { ToastProvider } from "@/components/provider/toater-provider";

export async function generateMetadata() {
  return { title: "Đăng nhập" };
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ToastProvider />
      {children}
    </main>
  );
};

export default LoginLayout;
