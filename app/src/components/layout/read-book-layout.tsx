export const ReadBookLayoutUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className="w-full flex flex-col h-screen max-h-screen bg-white relative"
      data-testid="read-book-layout"
    >
      <main className="flex flex-col h-full lg:pb-0" data-testid="main">
        {children}
      </main>
    </div>
  );
};
