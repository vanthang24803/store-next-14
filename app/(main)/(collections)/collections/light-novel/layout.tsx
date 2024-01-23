export async function generateMetadata() {
    return { title: "Light Novel" };
  }
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
  
    return (
      <div>{children}</div>
    );
  };
  
  export default Layout;
  