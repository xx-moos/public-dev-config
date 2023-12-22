const fs = require("fs/promises");

// 写入JSON文件
exports.writeJsonFile = async function writeJsonFile(path, data) {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 1), "utf8");
        console.log("Data written to file successfully.");
    } catch (err) {
        console.error("err - >:", err);
    }
};

// 读取JSON文件
exports.readJsonFile = readJsonFile;
async function readJsonFile(path) {
    try {
        return await fs.readFile(path, "utf8");
    } catch (err) {
        console.error("err - >:", err);
    }
}

exports.readJsonFileAndParse = async function readJsonFileAndParse(filePath) {
    let dataStr = (await readJsonFile(filePath)) || "[]";
    return JSON.parse(dataStr);
};
