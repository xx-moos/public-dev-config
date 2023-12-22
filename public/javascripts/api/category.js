const list = async (params = {}) => {
    const res = await x_get(baseUrl + "/category/page", params);
    return {
        success: true,
        data: res.data.list,
        total: res.data.total,
    };
};

const save = async (params = {}) => {
    const res = await x_post(baseUrl + "/category/edit", params);
    return res;
};
