export async function generateMetadata() {
    return { title: "Kĩ năng" };
  }
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
  
    return (
      <div>{children}</div>
    );
  };
  
  export default Layout;
  