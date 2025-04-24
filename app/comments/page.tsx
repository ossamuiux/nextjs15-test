'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Comments() {
  // const response = await fetch('http://localhost:3000/comments/api');

  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }

  // const data = await response.json();

  const queryClient = useQueryClient();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: () => {
      return fetch('http://localhost:3000/comments/api').then((res) =>
        res.json()
      );
    },
  });

  const { mutate } = useMutation({
    mutationFn: (comment: { id: number; text: string }) => {
      const response = fetch('http://localhost:3000/comments/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      queryClient.invalidateQueries({ queryKey: ['comments'] });
      return response;
    },
  });

  function handleAdd() {
    mutate({
      id: Date.now(),
      text: '댓글 추가',
    });
  }

  return (
    <div>
      <h2>댓글페이지</h2>
      <button type="button" onClick={handleAdd}>
        댓글추가
      </button>
      <ul>
        {data?.map(({ id, text }: { id: number; text: string }) => (
          <li key={id}>
            {id}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
