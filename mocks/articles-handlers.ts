import { http, HttpResponse } from 'msw';
import articles from './articles.json';

let maxId = Math.max(...articles.map((item) => item.id));

export const articlesHandlers = [
  http.get('http://localhost:9090/articles', async ({ request }) => {
    await sleep(200);

    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const page = Number(url.searchParams.get('page'));

    // 페이지별 데이터 가져오기
    function getDataByPage(
      data: { id: number; title: string; content: string }[],
      page: number,
      limit: number
    ) {
      // 총페이지
      const totalPages = Math.ceil(data.length / limit);

      if (page < 1 || page > totalPages) {
        return []; // 잘못된 페이지 요청시 빈배열 반환
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // 총페이지, limit만큼 자른 배열 객체 보내기
      return {
        result: data.slice(startIndex, endIndex),
        total: data.length,
      };
    }

    // search없을 경우 'undefined' 문자로 들어옴
    // search 있을 경우 제목중 검색어 포함된 데이터만 필터링
    if (search !== 'undefined' && search) {
      const filterd = articles.filter((item) => {
        return item.title.includes(search);
      });
      const result = getDataByPage(filterd, page, 5);

      return HttpResponse.json(result);
    }

    // search 없을 경우 전체 데이터에서 page에 맞는 데이터만 가져옴
    const result = getDataByPage(articles, page, 5);

    return HttpResponse.json(result);
  }),
  // 기사 상세보기
  http.get('http://localhost:9090/articles/:id', async ({ params }) => {
    await sleep(200);

    const { id } = params;
    const article = articles.find((item) => item.id === Number(id));

    return HttpResponse.json(article);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
