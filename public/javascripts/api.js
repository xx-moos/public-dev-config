const baseUrl = "/";

const list = async (params = {}) => {
    const res = await x_get(baseUrl + "/category/page");
    console.log("res -> :", res);

    return {
        success: true,
        data: res.data.list,
        total: res.data.total,
    };
};

const getTreeList = async (params = {}) => {
    const res = await x_get(baseUrl + "/category/list");
    return res;
};

const save = async (params = {}) => {
    const res = await x_post(baseUrl + "/category/edit", params);
    return res;
};
