// 랜덤 정수 리턴
function getRandomInt(count: number) {
  return Math.floor(Math.random() * count);
}

export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 0, 1 랜덤하게 리턴받아 간헐적으로 에러 발생 테스트
  const random = getRandomInt(2);

  if (random === 1) {
    throw new Error('제품 로딩 에러');
  }

  return (
    <div className="flex h-[500px]">
      <div className="p-[30px] w-[300px]">제품 상세 페이지</div>
      <div className="p-[30px] grow bg-amber-300">{children}</div>
    </div>
  );
}
