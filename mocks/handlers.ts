import { http, HttpResponse } from 'msw';
import user from './user.json';

let maxId = Math.max(...user.map((item) => item.id));

export const handlers = [
  // GET 요청을 가로채고 가상 응답을 제공
  http.get('http://localhost:9090/user', async () => {
    await sleep(200);

    // 가상의 응답 데이터 반환
    return HttpResponse.json(user);
  }),
  http.post('http://localhost:9090/user', async ({ request }) => {
    await sleep(200);

    const item: any = await request.json();
    maxId++;
    user.push({ ...item, id: maxId });

    return HttpResponse.json(user);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
