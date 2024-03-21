import { ToastProvider } from "@/components/provider/toater-provider";

export async function generateMetadata() {
  return { title: "Tạo tài khoản" };
}

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ToastProvider />
      {children}
    </div>
  );
};

export default RegisterLayout;
