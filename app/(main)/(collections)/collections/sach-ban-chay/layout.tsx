export async function generateMetadata() {
    return { title: "Sách bán chạy" };
  }
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
  
    return (
      <div>{children}</div>
    );
  };
  
  export default Layout;
  