'use client';

import { useRouter } from 'next/navigation';

export default function ProductOrder() {
  const router = useRouter();

  function handleOrder() {
    // 주문하기 버튼 클릭시 처리할 로직 작성
    router.push('/');
  }

  return (
    <main>
      <h2>제품 주문</h2>
      <button type="button" onClick={handleOrder}>
        주문하기
      </button>
    </main>
  );
}
