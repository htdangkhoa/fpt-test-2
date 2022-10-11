import React, { useMemo, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

import CustomRouter from "../components/CustomRouter";
import List from "../pages/employee/List";
import Add from "../pages/employee/Add";
import About from "../pages/about";
import "./App.css";
import { routes } from "../constants";

const history = createBrowserHistory();

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = useMemo<MenuItem[]>(
    () => [
      getItem(<Link to={routes.HOME}>Home</Link>, "1", <TeamOutlined />),
      getItem(<Link to={routes.ABOUT}>About</Link>, "2", <UserOutlined />),
    ],
    [],
  );

  return (
    <CustomRouter history={history}>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />

          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onChange={(...args) => {
              console.log(args);
            }}
          />
        </Layout.Sider>

        <Layout className="site-layout">
          <Layout.Header className="site-layout-background" style={{ padding: 0 }} />

          <Layout.Content style={{ margin: "0 16px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path={routes.HOME} element={<Navigate replace to={routes.EMPLOYEE_LIST} />} />

                <Route path={routes.EMPLOYEE_LIST} element={<List />} />

                <Route path={routes.EMPLOYEE_ADD} element={<Add />} />

                <Route path={routes.EMPLOYEE_EDIT} element={<Add />} />

                <Route path={routes.ABOUT} element={<About />} />
              </Routes>
            </div>
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
        </Layout>
      </Layout>
    </CustomRouter>
  );
};

export default App;
