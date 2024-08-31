import express from "express";

const router = express.Router();
//支持的檔案類型
const supportedAssets = ["svg", "png", "jpg", "png", "jpeg", "mp4", "ogv"];

const assetExtensionRegex = () =>
{
    //JS 把陣列 Array 所有元素併成字串，且可任意穿插符號的 join()
  const formattedExtensionList = supportedAssets.join("|");
    //JS Regex 正則表達式
  return new RegExp(`/.+\.(${formattedExtensionList})$`);
};

router.get(assetExtensionRegex(), (req, res) => {
  res.redirect(303, `http://localhost:5173/src${req.path}`);
});

export default router;