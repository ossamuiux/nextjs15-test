import { http, HttpResponse } from 'msw';
import posts from './posts.json';

let maxId = Math.max(...posts.map((item) => item.id));

export const postsHandlers = [
  http.get('http://localhost:9090/posts', async () => {
    await sleep(3000);

    return HttpResponse.json(posts);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
