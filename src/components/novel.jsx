import { useState } from "react";
import { Tabs } from "antd";
import "../App.css";
import BasicSetting from './BasicSetting';

const Novel = () => {
  const items = [
    {
      key: 1,
      label: "基础设定",
      children: <BasicSetting />,
    },
    {
      key: 2,
      label: "情节编辑",
    },
    {
      key: 3,
      label: "其他编辑",
    },
    {
      key: 4,
      label: "故事生成",
    },
  ];

  return <Tabs defaultActiveKey={1} type="card" size={'large'} items={items} />;
};
export default Novel;
