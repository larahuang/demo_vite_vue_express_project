import express from "express";
import path from "path";
import homepageRouter from "./homepageRouter.js";
import assetsRouter from "./assetsRouter.js";

const port = process.env.PORT || 3000;
//載入為靜態目錄
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

const app = express();

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, Lara!" });
});

//如果是生產階段就連結到dist/，否則連接到public與/src
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

//將路由器連接到 Express 應用程式
app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});