const api_website = {
    list: async (params) => {
        const res = await x_get("/website/page", params);
        return {
            success: true,
            data: res.data.list,
            total: res.data.total,
        };
    },

    save: async (params) => {
        return await x_post("/website/edit", params);
    },

    // 批量保存
    batchSave: async (params) => {
        return await x_post("/website/batchSave", params);
    },
};
