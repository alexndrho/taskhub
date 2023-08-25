const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto max-w-md h-screen px-3">{children}</main>
  );
};

export default layout;
