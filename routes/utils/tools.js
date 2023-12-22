/** 分页函数 */
const pagingFunction = (pageNo = 1, pageSize = 10, array) => {
    const offset = (pageNo - 1) * pageSize;

    return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
};

exports.pagingFunction = pagingFunction;

/** 获取列表页数据 */
exports.getListPageData = function getListPageData(filters) {
    const { data, current, pageSize, ...other } = filters;
    let res = data;

    for (const key in other) {
        if (![undefined, null].includes(other[key])) {
            res = res.filter((item) => item[key].toString().includes(other[key]));
        }
    }
    res = pagingFunction(current, pageSize, res);
    return {
        list: res,
        total: res.length,
    };
};
