// 동일 타입을 두군데 이상 사용시 타입을 따로 정의하여 사용
type ProductDetailsProps = {
  params: Promise<{ productId: string }>;
};

// 함수의 리턴타입은 대부분 자동으로 추론되므로 생략
export async function generateMetadata({ params }: ProductDetailsProps) {
  // params는 Promise로 정의되어 있으므로 await를 사용하여 값을 가져옴
  const { productId } = await params;

  // api를 통해 productId에 대한 제품 상세 정보 사용가능
  // api가 없으므로 프라미스로 대체
  const title = await new Promise((resolve) => {
    setTimeout(() => resolve(`갤럭시 ${productId}`), 200);
  });

  return {
    title: `Product ${title}`,
  };
}

// params는 제네릭 프라미스 타입으로 정의
// 서버컴포넌트 본체에 async, await 사용 가능
export default async function ProductDetails({ params }: ProductDetailsProps) {
  // params는 Promise로 정의되어 있으므로 await를 사용하여 값을 가져옴
  const { productId } = await params;

  return <h2>details about product {productId}</h2>;
}
