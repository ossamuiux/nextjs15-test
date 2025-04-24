import Link from 'next/link';

export default function Products() {
  const productId = 100;

  return (
    <main>
      <Link href="/">home</Link>
      <h2>products</h2>
      <ul>
        <li>
          <Link href="/products/1">product 1</Link>
        </li>
        <li>
          <Link href="/products/2">product 2</Link>
        </li>
        <li>
          {/* replace 사용시 현재페이지가 히스토리에 추가되지않음 */}
          <Link href="/products/3" replace>
            product 3
          </Link>
        </li>
        <li>
          <Link href={`/products/${productId}`}>product {productId}</Link>
        </li>
      </ul>
    </main>
  );
}
