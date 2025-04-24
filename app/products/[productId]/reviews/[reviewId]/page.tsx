import { redirect } from 'next/navigation';

// 랜덤 정수 리턴
// function getRandomInt(count: number) {
//   return Math.floor(Math.random() * count);
// }

export default async function ProductReview({
  params,
}: {
  params: Promise<{ productId: string; reviewId: string }>;
}) {
  const { productId, reviewId } = await params;

  // 0, 1 랜덤하게 리턴받아 간헐적으로 에러 발생 테스트
  // const random = getRandomInt(2);

  // if (random === 1) {
  //   throw new Error('리뷰 로딩 에러');
  // }

  // reviewId가 999보다 크면 404 페이지로 이동
  if (parseInt(reviewId) > 999) {
    // notFound();
    // 서버측 리다이렉트
    // 브라우저 히스토리에 기록되지않으며 뒤로가기 안됨
    // 특정 조건에 따라 페이지 리다이렉트시 사용
    redirect('/products');
  }

  return (
    <h2>
      Review {reviewId} for product {productId}
    </h2>
  );
}
