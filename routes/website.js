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

    if (!pId) {
        let { list, total } = getListPageData({
            data: webDatas,
            current,
            pageSize,
            title,
            pId,
            state,
        });
        return res.json(successBody({ list, total }));
    } else {
        let { childrens = [] } = categoryDatas.find((item) => item.id == pId) || {};
        let list = [],
            total = 0;

        if (childrens.length) {
            list = webDatas.filter((item) => childrens.includes(item.id));
            total = list.length;
        }
        return res.json(successBody({ list, total }));
    }
});

router.post("/edit", async function (req, res) {
    const json = req.body;

    let datas = await readJsonFileAndParse(websiteFilePath);

    if (!json.id) {
        // 新增
        json.id = datas.length + 1;

        datas.push(json);
    } else {
        // 修改
        datas = datas.map((item) => {
            if (item.id == json.id) {
                return json;
            }
            return item;
        });
    }

    writeJsonFile(websiteFilePath, datas);

    return res.json(successBody(null));
});

router.post("/batchSave", async function (req, res) {
    const json = req.body;

    let datas = await readJsonFileAndParse(websiteFilePath);
    let categoryDatas = await readJsonFileAndParse(categoryFilePath);

    const childrens = json.selectedRows.map((it, ind) => it.id);
    categoryDatas.forEach((item) => {
        item.childrens = item.childrens.filter((id) => !childrens.includes(id));

        if (item.id === json.pId) {
            item.childrens = [...item.childrens, ...childrens];
        }
    });

    writeJsonFile(categoryFilePath, categoryDatas);
    return res.json(successBody(null));
});

module.exports = router;
