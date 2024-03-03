export async function generateMetadata() {
  return { title: "Đăng nhập" };
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {

  return (
      <div>{children}</div>
  );
};

export default LoginLayout;
