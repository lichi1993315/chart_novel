import { Tabs } from "antd";
import "../App.css";
// import StyleSetting from './StyleSetting';
import DetailEditing from './DetailEditing';

const Image = () => {
  const items = [
    {
      key: 1,
      label: "风格选择",
      // children: <StyleSetting />,
    },
    {
      key: 2,
      label: "细节编辑",
      children: <DetailEditing />,
    },
  ];

  return <Tabs defaultActiveKey={2} type="card" size={'large'} items={items} />;
};
export default Image;
