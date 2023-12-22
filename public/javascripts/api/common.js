const baseUrl = "";

const getTreeList = async (params = {}) => {
    const res = await x_get(baseUrl + "/category/list");
    return res;
};
