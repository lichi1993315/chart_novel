import { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";

import Novel from "./components/novel";
import Image from "./components/image";
import Video from "./components/video";

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#FFF",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            fontSize: 28,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          Logo
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[current]}
        >
          <Menu.Item key="1">
            <SmileOutlined />
            <span>小说生成</span>
            <Link to="/novel"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <SmileOutlined />
            <span>图片生成</span>
            <Link to="/image"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <SmileOutlined />
            <span>视频生成</span>
            <Link to="/video"></Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>一级路由</Breadcrumb.Item>
          <Breadcrumb.Item>二级路由</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" exact element={<Novel/>}></Route>
            <Route path="/novel" exact element={<Novel/>}></Route>
            <Route path="/image" exact element={<Image/>}></Route>
            <Route path="/video" exact element={<Video/>}></Route>
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Chart Novel ©2023 Created by Less
      </Footer>
    </Layout>
  );
};
export default App;
