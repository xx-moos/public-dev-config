const baseUrl = "";

const list = async (params) => {
    const res = await x_get(baseUrl + "/website/page", params);
    return {
        success: true,
        data: res.data.list,
        total: res.data.total,
    };
};

const save = async (params) => {
    return await x_post(baseUrl + "/website/edit", params);
};
