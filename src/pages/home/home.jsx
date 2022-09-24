import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useState, useEffect, useContext } from "react";
import icons from "../icons";
import AuthContext from "../../context/AuthContext";
import { getRoutes } from "../../services/authService";
import "./home.css";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const HomeComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setLoggedIn, user } = useContext(AuthContext);
  const [routes, setRoutes] = useState([]);

  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
    setLoggedIn(false);
  }

  useEffect(() => {
    async function fetchRoutes() {
      const routes = await getRoutes();
      const items = routes.map((route) => ({
        key: route.uri,
        icon: icons[route.icon],
        label: route.name,
      }));
      setRoutes(items);
    }
    fetchRoutes();
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={routes}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              display: "flex",
              padding: 0,
              justifyContent: "space-between",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                style: {
                  margin: "2em",
                },
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Dropdown
              className="site-user-dropdown"
              overlay={
                <Menu
                  items={[
                    {
                      key: "1",
                      label: (
                        <Button
                          style={{
                            borderStyle: "none",
                          }}
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      ),
                    },
                  ]}
                />
              }
            >
              <div className="site-dropdown">
                <Space>
                  {user.first_name}
                  {user.last_name}
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"            
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeComponent;
