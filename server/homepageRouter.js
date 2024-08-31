import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
//
const environment = process.env.NODE_ENV;

//開發中，獲取所有的數據（來自打包產生dist/manifest.json
router.get("/*", async (_req, res) => {
    const data = {
        environment,
        manifest: await parseManifest(),
    };
    console.log('data', data)
    res.render("index.html.ejs", data);
});

const parseManifest = async () => {
  if (environment !== "production") return {};

    const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
    console.log('manifestPath', manifestPath)
    const manifestFile = await fs.readFile(manifestPath);
    console.log(' manifestFile', manifestFile)
  return JSON.parse(manifestFile);
};

export default router;