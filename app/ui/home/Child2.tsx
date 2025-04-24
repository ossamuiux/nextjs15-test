'use client';

import { use } from 'react';

// posts는 데이터를 감싼 프라미스이므로 프라미스타입 + 제네릭으로 안쪽 데이터 타입 명시
export default function Child2({
  posts,
}: {
  posts: Promise<{ id: number; title: string; content: string }[]>;
}) {
  // 비동기로 들어오는 프라미스의 결과를 기다렸다가 데이터로 변환
  const allPosts = use(posts);

  return (
    <ul>
      {allPosts.map((item) => (
        <li key={item.id}>{item.title} 자식으로 보내진 데이터</li>
      ))}
    </ul>
  );
}
