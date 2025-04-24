'use client';

import Pagination from '@/app/ui/Pagination';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

export default function Articles({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // 프라미스를 해결하여 객체로 변환
  const paramsObj = use(searchParams);
  // params를 state로 관리해야 effect와 클릭핸들러에서 동일 값으로 사용 가능
  const [params] = useState(new URLSearchParams(paramsObj));

  // 렌더링후 input요소와 연결되므로 제네릭인자 전달
  const inputRef = useRef<HTMLInputElement>(null);

  // 쿼리 파라메터로 url변경시 사용
  const router = useRouter();

  // 검색과 페이지 파라메터 변경시 데이터 가져오기
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['articles', paramsObj.search, page],
    queryFn: () =>
      fetch(
        `http://localhost:9090/articles?search=${paramsObj.search}&page=${page}`
      ).then((res) => res.json()),
  });

  // data 상태 변경시 totalPage 계산
  useEffect(() => {
    // data 없으면 NaN이므로 0으로 초기화
    setTotalPage(Math.ceil(data?.total / 5) || 0);
  }, [data]);

  // page 상태 변경시 쿼리 파라미터에 page 추가
  useEffect(() => {
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }, [page]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 검색필드 값이 있을 경우 쿼리 파라미터 추가
    if (inputRef?.current?.value) {
      params.set('search', inputRef.current.value);
    } else {
      // 검색필드 값이 없을 경우 쿼리 파라미터 삭제
      params.delete('search');
    }
    // url에 쿼리 파라미터 추가
    router.push(`?${params.toString()}`);
    setPage(1);
  }

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-medium mb-[20px]">뉴스 기사</h2>
      <form onSubmit={handleSearch} className="flex gap-x-[10px]">
        <input
          ref={inputRef}
          type="search"
          defaultValue={paramsObj.search}
          placeholder="검색어를 입력하세요"
          className="border border-gray-300 w-full"
          autoComplete="off"
        />
        <button type="submit" className="btn shrink-0">
          검색
        </button>
      </form>
      {isPending && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {data?.result?.length > 0 && (
        <ul className="space-y-[10px] mt-[20px] mb-[20px]">
          {data.result.map(
            (article: { id: number; title: string; content: string }) => (
              <li key={article.id}>
                <Link href={`/articles/${article.id}`}>{article.title}</Link>
              </li>
            )
          )}
        </ul>
      )}
      {!isPending && data.length === 0 && (
        <p className="text-gray-500 my-[40px] text-center">
          검색결과가 없습니다.
        </p>
      )}
      {data?.result?.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      )}
    </main>
  );
}
