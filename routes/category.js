var express = require("express");
var router = express.Router();
const path = require("path");
const { readJsonFileAndParse, writeJsonFile } = require("./utils/files");
const { successBody, errorBody } = require("./utils/config");
const { getListPageData } = require("./utils/tools");

const dataBasePath = "data";

const categoryFilePath = path.join(__dirname, "../", `${dataBasePath}/category.json`);

/* GET users listing. */
router.get("/list", async function (req, res, next) {
    let datas = await readJsonFileAndParse(categoryFilePath);

    return res.json(successBody(datas));
});

router.get("/page", async function (req, res, next) {
    const { current, pageSize, title, pId } = req.query;

    let data = await readJsonFileAndParse(categoryFilePath);

    let { list, total } = getListPageData({
        data,
        current,
        pageSize,
        title,
        pId,
    });

    return res.json(successBody({ list, total }));
});

router.post("/edit", async function (req, res, next) {
    const json = req.body;

    let allCategorys = await readJsonFileAndParse(categoryFilePath);

    if (!json.id) {
        // 判断是否存在
        const isHas = allCategorys.find((item) => item.title === json.title);
        if (isHas) {
            return res.json(errorBody(500, null, "已存在该分类"));
        }
        // 新增
        json.id = allCategorys.length + 1;

        allCategorys.push(json);
    } else {
        // 修改
        allCategorys = allCategorys.map((item) => {
            if (item.id === json.id) {
                return json;
            }
            return item;
        });
    }

    await writeJsonFile(categoryFilePath, allCategorys);

    return res.json(successBody(null));
});

module.exports = router;
