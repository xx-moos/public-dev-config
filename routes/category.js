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
    const map = {};
    (data || []).forEach((item) => {
        map[item.id] = item;
    });

    list = list.map((item) => {
        return {
            ...item,
            pTitle: map[item.pId]?.title,
            // fullId: `${map[item.pId]?.fullId || '0'}-${item.id}`,
        };
    });

    return res.json(successBody({ list, total }));
});

router.post("/edit", async function (req, res, next) {
    const json = req.body;

    let allCategorys = await readJsonFileAndParse(categoryFilePath);

    if (json.id == json.pId) {
        return res.json(errorBody(500, null, "父节点不能是自己"));
    }

    if (!json.id) {
        // 判断同级别下是否存在
        const isHas = allCategorys.find(
            (item) => item.title === json.title && item.pId === json.pId
        );
        if (isHas) {
            return res.json(errorBody(500, null, "同级别下已存在该分类"));
        }

        // 新增
        json.id = allCategorys.length + 1;

        if (!json.pId) {
            json.fullId = `0-${json.id}`;
        } else {
            json.fullId = `${allCategorys.find((item) => item.id === json.pId).fullId}-${json.id}`;
        }

        if (json.fullId.split("-").length > 3) {
            return res.json(errorBody(500, null, "节点不能超过2层"));
        }

        allCategorys.push(json);
    } else {
        // 修改
        if (!json.pId) {
            json.fullId = `0-${json.id}`;
        } else {
            json.fullId = `${allCategorys.find((item) => item.id === json.pId).fullId}-${json.id}`;
        }

        if (json.fullId.split("-").length > 3) {
            return res.json(errorBody(500, null, "节点不能超过2层"));
        }

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
