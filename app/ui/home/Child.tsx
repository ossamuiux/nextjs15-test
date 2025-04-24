// 클라이언트 컴포넌트는 상단에 use client 사용해야함
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Child() {
  const queryClient = useQueryClient();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch('http://localhost:9090/user').then((res) => res.json()),
  });

  // 버튼 클릭시 유저 추가
  const { mutate } = useMutation({
    // 자동완성에 나오는 user타입을 복붙
    mutationFn: (user: { [k: string]: FormDataEntryValue }) => {
      return fetch('http://localhost:9090/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    },
    onSuccess: () => {
      // people키에 대한 데이터 초기화후 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // onSubmit 속성의 자동완성에 나오는 e타입을 복붙
  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // e.target의 타입을 타입 단언으로 구체적으로 알려줌
    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const user = Object.fromEntries(formData.entries());

    if (user.name && user.country && user.lang) {
      mutate(user);
    }
  }

  return (
    <div>
      <h2 className="text-[30px] font-bold">클라이언트 컴포넌트</h2>
      <form onSubmit={handleAddUser} className="space-y-[10px]">
        <div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="국가"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="lang"
            placeholder="언어"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <button type="submit" className="btn">
          유저추가
        </button>
      </form>
      {isPending && <p>로딩중...</p>}
      {isError && <p>{error.message}</p>}
      {data && data?.length > 0 && (
        <ul className="space-y-[5px] mt-[15px]">
          {data.map(
            (user: {
              id: number;
              name: string;
              country: string;
              lang: string;
            }) => (
              <li key={user.id} className="flex gap-x-[10px]">
                <p>id: {user.id}</p>
                <p>이름: {user.name}</p>
                <p>국가: {user.country}</p>
                <p>기술스택: {user.lang}</p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
