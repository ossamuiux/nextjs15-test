'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

// 서버컴포넌트에서 async/await 사용 가능
// lang 쿼리 파라메터는 선택사항이며 기본값은 'ko'
// lang은 'ko', 'en', 'fr' 중 하나의 값을 가질 수 있음(유니언 타입)
// 클라이언트 컴포넌트 본체에 async/await 사용 불가
export default function Article({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: 'ko' | 'en' | 'fr' }>;
}) {
  // params와 searchParams는 Promise 객체이므로 await로 값을 가져옴
  // 클라이언트 컴포넌트에선 use()를 사용하여 Promise의 해결을 기다림
  const { articleId } = use(params);
  const { lang = 'ko' } = use(searchParams);
  const router = useRouter();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: () =>
      fetch(`http://localhost:9090/articles/${articleId}`).then((res) =>
        res.json()
      ),
  });

  return (
    <main className="p-[30px]">
      <button type="button" onClick={() => router.back()}>
        뒤로가기
      </button>
      <h2 className="text-[24px]">뉴스기사 {articleId}</h2>
      <p className="my-[20px]">{lang}로 읽기</p>
      {isPending && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {data && (
        <>
          <h3 className="text-[20px] font-medium text-gray-600">
            {data.title}
          </h3>
          <p className="mt-[20px]">{data.content}</p>
        </>
      )}
      <div className="space-x-[10px] mt-[30px]">
        <Link
          href={`/articles/${articleId}?lang=ko`}
          className={lang === 'ko' ? 'text-point1' : ''}
        >
          korean
        </Link>
        <Link
          href={`/articles/${articleId}?lang=en`}
          className={lang === 'en' ? 'text-point1' : ''}
        >
          english
        </Link>
        <Link
          href={`/articles/${articleId}?lang=fr`}
          className={lang === 'fr' ? 'text-point1' : ''}
        >
          franch
        </Link>
      </div>
    </main>
  );
}
