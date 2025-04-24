'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  function reload() {
    // 오류 발생후 실행되도록 작업 우선순위 낮춤
    startTransition(() => {
      // 새로고침
      router.refresh();
      // 에러 상태 초기화
      reset();
    });
  }

  return (
    <div>
      <p>{error.message}</p>
      {/* reset()으로 상태초기화 */}
      <button type="button" onClick={() => reload()} className="btn">
        다시 시도
      </button>
    </div>
  );
}
