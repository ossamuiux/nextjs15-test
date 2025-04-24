import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-start p-[30px]">
      <h2>Welcome home!</h2>
      <Link href="/blog">blog</Link>
      <Link href="/products">products</Link>
      <Link href="/articles/breaking-news-123?lang=ko">read in korean</Link>
      <Link href="/articles/breaking-news-123?lang=en">read in english</Link>
      <Link href="/articles/breaking-news-123?lang=fr">read in franch</Link>
      <Link href="/articles" className="btn">
        뉴스기사 보기
      </Link>
    </main>
  );
}
