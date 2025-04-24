// 훅이나 이벤트핸들러 사용시 'use client'를 사용
'use client';

import { usePathname } from 'next/navigation';

export default function NotFound() {
  // 현재경로
  const pathname = usePathname();
  // console.log(pathname, pathname.split('/'));
  const productId = pathname.split('/')[2];
  const reviewId = pathname.split('/')[4];

  return (
    <main>
      <p>
        {productId}번 상품에 대한 {reviewId}번 리뷰를 찾을 수 없습니다.
      </p>
    </main>
  );
}
