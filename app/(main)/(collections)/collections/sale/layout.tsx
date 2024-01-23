export async function generateMetadata() {
    return { title: "Khuyến mãi" };
  }
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
  
    return (
      <div>{children}</div>
    );
  };
  
  export default Layout;
  