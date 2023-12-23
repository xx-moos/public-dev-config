/** 分页函数 */
const pagingFunction = (pageNo = 1, pageSize = 10, array) => {
    var offset = (pageNo - 1) * pageSize;
    var t = Number(offset) + Number(pageSize);
    return t >= array.length ? array.slice(offset, array.length) : array.slice(offset, t);
};

exports.pagingFunction = pagingFunction;

/** 获取列表页数据 */
exports.getListPageData = function getListPageData(filters) {
    let { data, current, pageSize, ...other } = filters;
    const filterKeys = Object.keys(other);
    filterKeys.forEach((key) => {
        if (other[key] == undefined || other[key] == "") {
            return data;
        }
        console.log("key - >:", key);
        data = data.filter((p) => {
            return key == "pId" ? p[key] == other[key] : p[key].toString().includes(other[key]);
        });
    });
    console.log("data - >:", data.length);

    let res = data;
    res = pagingFunction(current, pageSize, data);
    return {
        list: res,
        total: data.length,
    };
};
