const { AppstoreOutlined, MailOutlined, SettingOutlined } = icons;

// 页面内容
const X_Header = ({ menuKey }) => {
    const [current, setCurrent] = React.useState(menuKey);
    const onClick = (e) => {
        console.log("e - >:", e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <a href="/">分类管理</a>,
            key: "category",
            icon: <AppstoreOutlined />,
        },
        {
            label: <a href="/site.html">网站管理</a>,
            icon: <SettingOutlined />,
            key: "site",
        },
    ];

    return (
        <antd.Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

const renderHeader = (menuKey) => {
    const headerDom = document.createElement("div");
    headerDom.id = "header";
    document.querySelector("body").insertBefore(headerDom, document.querySelector("#root"));

    // 将页面内容渲染到指定容器
    ReactDOM.render(<X_Header menuKey={menuKey} />, document.querySelector("#header"));
};
