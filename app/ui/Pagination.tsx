import { useEffect, useState } from 'react';
import { generatePagination } from '@/app/_lib/utils';

export default function Pagination({
  totalPage,
  setPage,
  page,
}: {
  totalPage: number;
  setPage: (page: number) => void;
  page: number;
}) {
  const [pageArr, setPageArr] = useState<(number | string)[]>([]);

  // 페이지나 총페이지가 바뀔때마다 페이지 배열 생성
  useEffect(() => {
    const arr = generatePagination(page, totalPage);
    setPageArr(arr);
  }, [page, totalPage]);

  return (
    <div className="flex gap-x-[5px]">
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        className="btn leading-[28px] px-[10px] text-[14px] disabled:opacity-50"
        disabled={page === 1}
      >
        이전
      </button>
      {pageArr.map((item, i) => {
        if (item === '...') {
          return <span key={i}>...</span>;
        } else {
          return (
            <button
              type="button"
              key={i}
              onClick={() => setPage(item as number)}
              className={`${
                page === item ? 'bg-point1 text-white' : 'text-black'
              } btn leading-[28px] px-[10px] text-[14px]`}
            >
              {item}
            </button>
          );
        }
      })}

      <button
        type="button"
        onClick={() => setPage(page + 1)}
        className="btn leading-[28px] px-[10px] text-[14px] disabled:opacity-50"
        disabled={page === totalPage}
      >
        다음
      </button>
    </div>
  );
}
