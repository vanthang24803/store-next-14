export async function generateMetadata() {
    return { title: "Tất cả sản phẩm" };
  }
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
  
    return (
      <div>{children}</div>
    );
  };
  
  export default Layout;
  