import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const server = jsonServer.create();
const router = jsonServer.router("build/db/app.json");
const middlewares = jsonServer.defaults({
  static: "build",
  noCors: true,
});
const port = process.env.PORT || 3131;

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(jsonServer.defaults({ static: path.join(__dirname, "build") }));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
