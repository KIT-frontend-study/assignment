let posts = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "node server.js로 실행되는 API 서버에서 가져온 게시글입니다.",
    author: "관리자",
    viewCount: 12,
    createdAt: "2026-05-26",
  },
  {
    id: 2,
    title: "Next.js 게시판",
    content: "목록, 상세, 작성 페이지가 localhost:4000/posts API와 연결되어 있습니다.",
    author: "멋사",
    viewCount: 7,
    createdAt: "2026-05-26",
  },
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

async function main() {
  const http = await import("node:http");
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost:4000");

    if (req.method === "OPTIONS") {
      return sendJson(res, 204, null);
    }

    if (req.method === "GET" && url.pathname === "/") {
      return sendJson(res, 200, {
        message: "Post API server is running",
        endpoints: {
          posts: "GET http://localhost:4000/posts",
          postDetail: "GET http://localhost:4000/posts/1",
          createPost: "POST http://localhost:4000/posts",
          deletePost: "DELETE http://localhost:4000/posts/1",
        },
        app: "Open the Next.js app at http://localhost:3000/post",
      });
    }

    if (req.method === "GET" && url.pathname === "/posts") {
      return sendJson(res, 200, posts);
    }

    if (req.method === "GET" && url.pathname.startsWith("/posts/")) {
      const id = Number(url.pathname.split("/")[2]);
      const post = posts.find((item) => item.id === id);

      if (!post) {
        return sendJson(res, 404, { message: "Post not found" });
      }

      post.viewCount += 1;
      return sendJson(res, 200, post);
    }

    if (req.method === "POST" && url.pathname === "/posts") {
      try {
        const body = await readBody(req);

        if (!body.title || !body.content || !body.author) {
          return sendJson(res, 400, { message: "title, content, author are required" });
        }

        const nextPost = {
          id: posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1,
          title: body.title,
          content: body.content,
          author: body.author,
          viewCount: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        };

        posts = [nextPost, ...posts];
        return sendJson(res, 201, nextPost);
      } catch {
        return sendJson(res, 400, { message: "Invalid JSON body" });
      }
    }

    if (req.method === "DELETE" && url.pathname.startsWith("/posts/")) {
      const id = Number(url.pathname.split("/")[2]);
      const post = posts.find((item) => item.id === id);

      if (!post) {
        return sendJson(res, 404, { message: "Post not found" });
      }

      posts = posts.filter((item) => item.id !== id);
      return sendJson(res, 200, post);
    }

    return sendJson(res, 404, { message: "Not found" });
  });

  server.listen(4000, () => {
    console.log("Post API server is running at http://localhost:4000");
  });
}

main();