import { Montserrat, Lusitana } from 'next/font/google';
import localFont from 'next/font/local';

// 변수형 폰트는 weight지정없이 사용
export const montserrat = Montserrat({
  subsets: ['latin'],
  // 브라우저의 폰트 표현방식을 swap으로 하여 시스템폰트로 보여준후
  // 웹폰트 다운로드되면 웹폰트로 보여짐
  display: 'swap',
});

// 변수형 아닌경우 사용할 weight지정
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const pretendard = localFont({
  src: [
    { path: '../../public/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/fonts/Pretendard-Bold.woff', weight: '700' },
  ],
  display: 'swap',
});
