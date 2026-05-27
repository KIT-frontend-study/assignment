const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 4000;
const DB_FILE = path.join(__dirname, "posts-db.json");

const initialPosts = [
  {
    id: 1,
    title: "프론트엔드 스터디 1주차 안내",
    summary: "HTML과 CSS로 게시글 상세 페이지를 만들어보는 주차입니다.",
    content:
      "이번 주차는 HTML 문서 구조와 CSS 레이아웃을 연결해서 실제 게시글 상세 페이지를 완성하는 연습을 합니다.\n\n제목, 작성자, 작성일, 본문 영역을 의미에 맞는 태그로 나누고, CSS 박스 모델을 이용해 읽기 편한 간격을 잡아보세요. 특히 목록 페이지에서 넘어온 게시글 id를 기준으로 상세 데이터를 조회하는 흐름까지 함께 확인하면 이후 API 연동 과제가 훨씬 수월해집니다.\n\n제출할 때는 완성 화면 캡처와 함께 본인이 사용한 태그, 레이아웃 방식, 어려웠던 점을 간단히 정리해 주세요.",
    author: "관리자",
    category: "공지",
    tags: ["HTML", "CSS", "스터디"],
    viewCount: 124,
    createdAt: "2026-03-16T09:00:00.000Z",
  },
  {
    id: 2,
    title: "CSS 박스모델 질문",
    summary: "margin, padding, border 차이가 아직 헷갈립니다.",
    content:
      "게시글 카드 스타일을 만들다가 margin, padding, border가 어디에 적용되는지 계속 헷갈려서 질문 남깁니다.\n\n제가 이해한 바로는 padding은 요소 내부에서 콘텐츠와 테두리 사이의 여백이고, margin은 요소 바깥에서 다른 요소와 떨어지는 간격입니다. 그런데 개발자 도구에서 확인하면 전체 너비가 예상보다 커지는 경우가 있어서 box-sizing 설정까지 같이 봐야 하는지 궁금합니다.\n\n목록 카드 사이 간격은 margin으로 처리하고, 카드 내부 제목과 본문 사이 간격은 padding이나 gap으로 처리하는 방식이 맞는지도 같이 확인 부탁드립니다.",
    author: "김학생",
    category: "질문",
    tags: ["CSS", "박스모델", "레이아웃"],
    viewCount: 87,
    createdAt: "2026-03-17T10:20:00.000Z",
  },
  {
    id: 3,
    title: "JS로 목록 렌더링하기",
    summary: "더미 데이터를 배열로 만들고 map으로 화면에 출력해봅니다.",
    content:
      "이번 실습에서는 게시글 더미 데이터를 배열로 만들고, map을 사용해서 목록 UI를 렌더링합니다.\n\n처음에는 HTML 문자열을 직접 이어 붙이는 방식으로 시작해도 괜찮지만, 데이터와 화면이 어떤 기준으로 연결되는지 꼭 확인해야 합니다. 예를 들어 id는 상세 페이지 이동에 사용하고, title과 summary는 목록에서 보여주며, content는 상세 페이지에서만 보여주는 식으로 역할을 분리하면 화면 구조가 더 명확해집니다.\n\n추가로 데이터가 비어 있을 때 보여줄 빈 상태 메시지와, 렌더링 전에 기존 목록을 비우는 처리까지 넣어보면 실제 서비스 코드에 가까운 흐름을 연습할 수 있습니다.",
    author: "박스터디",
    category: "실습",
    tags: ["JavaScript", "DOM", "렌더링"],
    viewCount: 156,
    createdAt: "2026-03-18T12:30:00.000Z",
  },
  {
    id: 4,
    title: "fetch 연습용 게시글",
    summary: "이제 로컬 API에서 데이터를 받아와 화면에 보여줄 차례입니다.",
    content:
      "이 게시글은 fetch로 로컬 API 데이터를 받아오는 연습을 위해 준비된 상세 데이터입니다.\n\n목록 화면에서는 /posts 요청으로 id, title, summary 같은 가벼운 데이터만 받아오고, 사용자가 게시글을 선택하면 /posts/:id 요청으로 긴 본문과 태그, 조회수 같은 상세 데이터를 다시 받아오면 됩니다. 이렇게 나누면 목록 화면에서 불필요하게 긴 본문을 모두 내려받지 않아도 됩니다.\n\n실습할 때는 네트워크 탭에서 요청 URL, 응답 상태 코드, 응답 JSON 구조를 직접 확인하세요. 요청이 실패했을 때 사용자에게 어떤 메시지를 보여줄지도 같이 구현해보면 좋습니다.",
    author: "이학습",
    category: "API",
    tags: ["fetch", "API", "비동기"],
    viewCount: 203,
    createdAt: "2026-03-19T14:10:00.000Z",
  },
  {
    id: 5,
    title: "게시글 삭제 테스트",
    summary: "DELETE 요청을 보내면 이 게시글을 지울 수 있습니다.",
    content:
      "삭제 기능을 테스트하기 위한 게시글입니다. 이 데이터는 DELETE /posts/:id 요청을 보내면 posts-db.json에서 제거됩니다.\n\n삭제 버튼을 만들 때는 사용자가 실수로 누르지 않도록 확인 절차를 두는 편이 좋습니다. 요청이 성공하면 목록을 다시 불러오거나, 화면에 남아 있는 해당 게시글 요소를 제거해서 서버 상태와 UI 상태가 어긋나지 않게 처리해야 합니다.\n\n또한 존재하지 않는 id로 삭제 요청을 보냈을 때 404 응답이 오는지도 확인해보세요. 성공 케이스만 구현하면 실제 사용 중 오류 상황에서 화면이 멈춘 것처럼 보일 수 있습니다.",
    author: "최프론트",
    category: "테스트",
    tags: ["DELETE", "상태관리", "에러처리"],
    viewCount: 64,
    createdAt: "2026-03-20T08:45:00.000Z",
  },
];

function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialPosts, null, 2));
  }
}

function readPosts() {
  ensureDb();
  const posts = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));

  if (!Array.isArray(posts)) {
    throw new Error("posts-db.json must contain an array.");
  }

  return posts;
}

function writePosts(posts) {
  fs.writeFileSync(DB_FILE, JSON.stringify(posts, null, 2));
}

function createSummary(content) {
  const firstParagraph = String(content || "").split(/\n\s*\n/)[0].trim();

  if (firstParagraph.length <= 80) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, 80)}...`;
}

function toPostListItem(post) {
  return {
    id: post.id,
    title: post.title,
    summary: post.summary || createSummary(post.content),
    author: post.author,
    createdAt: post.createdAt,
  };
}

function toPostDetail(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    category: post.category || "일반",
    tags: Array.isArray(post.tags) ? post.tags : [],
    viewCount: Number.isInteger(post.viewCount) ? post.viewCount : 0,
    createdAt: post.createdAt,
  };
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, html) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(html);
}

function sendNoContent(res) {
  res.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
}

function parsePostId(pathname) {
  const match = pathname.match(/^\/posts\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });

    req.on("error", reject);
  });
}

function normalizeRequiredText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function createPost(req, res) {
  let body;

  try {
    body = await readRequestBody(req);
  } catch (error) {
    sendJson(res, 400, { message: error.message });
    return;
  }

  const title = normalizeRequiredText(body.title);
  const content = normalizeRequiredText(body.content);
  const author = normalizeRequiredText(body.author);

  if (!title || !content || !author) {
    sendJson(res, 400, {
      message: "title, content, author are required.",
    });
    return;
  }

  const posts = readPosts();
  const nextId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
  const newPost = {
    id: nextId,
    title,
    summary: createSummary(content),
    content,
    author,
    category: "일반",
    tags: [],
    viewCount: 0,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writePosts(posts);

  sendJson(res, 201, toPostDetail(newPost));
}

function getOpenApiSpec() {
  return {
    openapi: "3.0.0",
    info: {
      title: "Local Board API",
      version: "1.0.0",
      description: "프론트엔드 API 연동 연습용 로컬 게시판 API입니다.",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    paths: {
      "/health": {
        get: {
          summary: "서버 상태 확인",
          responses: {
            200: {
              description: "서버가 실행 중입니다.",
            },
          },
        },
      },
      "/posts": {
        get: {
          summary: "게시글 목록 조회",
          responses: {
            200: {
              description: "게시글 목록",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/PostListItem" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "게시글 생성",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreatePostRequest" },
                example: {
                  title: "새 게시글",
                  content: "API로 생성한 게시글입니다.",
                  author: "홍길동",
                },
              },
            },
          },
          responses: {
            201: {
              description: "생성된 게시글",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PostDetail" },
                },
              },
            },
            400: {
              description: "필수값 누락 또는 잘못된 JSON",
            },
          },
        },
      },
      "/posts/{id}": {
        get: {
          summary: "게시글 상세 조회",
          parameters: [{ $ref: "#/components/parameters/PostId" }],
          responses: {
            200: {
              description: "게시글 상세",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PostDetail" },
                },
              },
            },
            404: {
              description: "게시글을 찾을 수 없음",
            },
          },
        },
        delete: {
          summary: "게시글 삭제",
          parameters: [{ $ref: "#/components/parameters/PostId" }],
          responses: {
            200: {
              description: "삭제 완료",
            },
            404: {
              description: "게시글을 찾을 수 없음",
            },
          },
        },
      },
    },
    components: {
      parameters: {
        PostId: {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "게시글 ID",
        },
      },
      schemas: {
        PostListItem: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "프론트엔드 스터디 안내" },
            summary: {
              type: "string",
              example: "HTML과 CSS로 게시글 상세 페이지를 만들어보는 주차입니다.",
            },
            author: { type: "string", example: "관리자" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-16T09:00:00.000Z",
            },
          },
        },
        PostDetail: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "프론트엔드 스터디 안내" },
            content: {
              type: "string",
              example:
                "이번 주차는 HTML 문서 구조와 CSS 레이아웃을 연결해서 실제 게시글 상세 페이지를 완성하는 연습을 합니다.",
            },
            author: { type: "string", example: "관리자" },
            category: { type: "string", example: "공지" },
            tags: {
              type: "array",
              items: { type: "string" },
              example: ["HTML", "CSS", "스터디"],
            },
            viewCount: { type: "integer", example: 124 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-16T09:00:00.000Z",
            },
          },
        },
        CreatePostRequest: {
          type: "object",
          required: ["title", "content", "author"],
          properties: {
            title: { type: "string", example: "새 게시글" },
            content: { type: "string", example: "API로 생성한 게시글입니다." },
            author: { type: "string", example: "홍길동" },
          },
        },
      },
    },
  };
}

function getDocsHtml() {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Local Board API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: "/openapi.json",
        dom_id: "#swagger-ui"
      });
    };
  </script>
</body>
</html>`;
}

async function handleRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    sendNoContent(res);
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  try {
    if (req.method === "GET" && pathname === "/") {
      sendJson(res, 200, {
        message: "Local Board API",
        docs: `http://localhost:${PORT}/docs`,
        posts: `http://localhost:${PORT}/posts`,
      });
      return;
    }

    if (req.method === "GET" && pathname === "/health") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && pathname === "/docs") {
      sendHtml(res, getDocsHtml());
      return;
    }

    if (req.method === "GET" && pathname === "/openapi.json") {
      sendJson(res, 200, getOpenApiSpec());
      return;
    }

    if (req.method === "GET" && pathname === "/posts") {
      sendJson(res, 200, readPosts().map(toPostListItem));
      return;
    }

    if (req.method === "POST" && pathname === "/posts") {
      await createPost(req, res);
      return;
    }

    const postId = parsePostId(pathname);

    if (postId !== null && req.method === "GET") {
      const post = readPosts().find((item) => item.id === postId);

      if (!post) {
        sendJson(res, 404, { message: "Post not found." });
        return;
      }

      sendJson(res, 200, toPostDetail(post));
      return;
    }

    if (postId !== null && req.method === "DELETE") {
      const posts = readPosts();
      const nextPosts = posts.filter((post) => post.id !== postId);

      if (posts.length === nextPosts.length) {
        sendJson(res, 404, { message: "Post not found." });
        return;
      }

      writePosts(nextPosts);
      sendJson(res, 200, { message: "Post deleted.", id: postId });
      return;
    }

    sendJson(res, 404, { message: "Route not found." });
  } catch (error) {
    sendJson(res, 500, {
      message: "Internal server error.",
      detail: error.message,
    });
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  ensureDb();
  console.log(`API server: http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/docs`);
});
