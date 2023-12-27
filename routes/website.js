var express = require("express");
var router = express.Router();
const path = require("path");
const { readJsonFileAndParse, writeJsonFile } = require("./utils/files");
const { successBody, errorBody } = require("./utils/config");
const { getListPageData } = require("./utils/tools");

const dataBasePath = "data";

const websiteFilePath = path.join(__dirname, "../", `${dataBasePath}/website.json`);
const categoryFilePath = path.join(__dirname, "../", `${dataBasePath}/category.json`);

/* GET users listing. */
router.get("/page", async function (req, res, next) {
    const { current, pageSize, title, state, pId } = req.query;

    let webDatas = await readJsonFileAndParse(websiteFilePath);
    let categoryDatas = await readJsonFileAndParse(categoryFilePath);

    let { list, total } = getListPageData({
        data: webDatas,
        current,
        pageSize,
        title,
        pId,
        state,
    });

    // const categoryMap = {};
    // categoryDatas.forEach((item) => {
    //     categoryMap[item.id] = item;
    // });

    // list = list.map((item) => {
    //     return {
    //         ...item,
    //         pTitle: categoryMap[item.pId]?.title,
    //     };
    // });

    return res.json(successBody({ list, total }));
});

router.post("/edit", async function (req, res) {
    const json = req.body;

    let datas = await readJsonFileAndParse(websiteFilePath);
    let categoryDatas = await readJsonFileAndParse(categoryFilePath);

    let categoryInfo = categoryDatas.find((item) => item.id === json.pId);
    json.fullId = categoryInfo.fullId;

    json.fullId += `-${json.id}`;

    json.pTitle = categoryInfo.title;

    if (!json.id) {
        // 新增
        json.id = datas.length + 1;

        datas.push(json);
    } else {
        // 修改
        datas.forEach((item) => {
            if (item.id === json.id) {
                item = { ...json };
            }
        });
    }

    writeJsonFile(websiteFilePath, datas);

    return res.json(successBody(null));
});

router.post("/batchSave", async function (req, res) {
    const json = req.body;

    let datas = await readJsonFileAndParse(websiteFilePath);
    let categoryDatas = await readJsonFileAndParse(categoryFilePath);

    const categoryInfo = categoryDatas.find((item) => item.id === json.pId);

    json.selectedRows.forEach((item) => {
        item.fullId = `${categoryInfo.fullId}-${item.id}`;
        item.pId = json.pId;
        item.state = json.state;
        item.pTitle = categoryInfo.title;
    });

    datas = datas.map((item) => {
        const has = json.selectedRows.find((i) => i.id === item.id);
        if (has) {
            return { ...has };
        }
        return item;
    });

    writeJsonFile(websiteFilePath, datas);
    return res.json(successBody(null));
});

module.exports = router;
