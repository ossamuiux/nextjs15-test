// 인터페이스, 타입은 type키워드 사용 권장
import type { Metadata } from 'next';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';
import { pretendard } from '@/app/ui/fonts';
import Header from '@/app/ui/home/Header';
import Footer from '@/app/ui/home/Footer';

export const metadata: Metadata = {
  title: {
    default: '네이버',
    // %s는 형식문자이며 서브페이지 타이틀이 들어감
    template: '%s | 네이버',
  },
  description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요.',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}
