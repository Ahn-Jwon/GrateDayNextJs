// 헤더와 푸터
import Header from "@/components/shared/hearder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
       <Header /> 
      <main className='flex-1 wrapper'>{children}</main>
    </div>
  );
}
