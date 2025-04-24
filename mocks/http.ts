import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { handlers } from './handlers';
import { postsHandlers } from './posts-handlers';
import { articlesHandlers } from './articles-handlers';

const app = express();
const port = 9090; // Mock 서버 포트

app.use(
  cors({
    origin: 'http://localhost:3000', // 클라이언트 주소
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
// MSW 핸들러 연결
app.use(createMiddleware(...handlers, ...postsHandlers, ...articlesHandlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
