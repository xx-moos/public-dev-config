const api_category = {
    list: async (params = {}) => {
        const res = await x_get("/category/page", params);
        return {
            success: true,
            data: res.data.list,
            total: res.data.total,
        };
    },
    save: async (params = {}) => {
        const res = await x_post("/category/edit", params);
        return res;
    },
};
