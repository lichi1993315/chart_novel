import { Radio, Button, Form, Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PromptList from "./PromptList";

import "../App.css";

const { Panel } = Collapse;

const DetailEditing = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const panelStyle = {
    margin: "24px 0",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const input = () => {
    form.resetFields();
  };

  const output = () => {
    form.resetFields();
  };

  return (
    <>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">质量</Radio.Button>
        <Radio.Button value="b">容貌</Radio.Button>
        <Radio.Button value="c">构图</Radio.Button>
        <Radio.Button value="d">构图</Radio.Button>
        <Radio.Button value="e">构图</Radio.Button>
        <Radio.Button value="f">构图</Radio.Button>
        <Radio.Button value="g">构图</Radio.Button>
        <Radio.Button value="h">构图</Radio.Button>
        <Radio.Button value="i">构图</Radio.Button>
      </Radio.Group>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
      >
        <Panel header="头发" key="1" style={panelStyle}>
          <PromptList
            list={[
              {
                displayName: "unreal engine",
                name: "虚幻引擎",
                subType: "style",
              },
              {
                displayName: "cinematic lighting",
                name: "电影光效",
                subType: "command",
              },
              {
                displayName: "cinematic lighting2",
                name: "电影光效2",
                subType: "style",
              },
              {
                displayName: "cinematic lighting3",
                name: "电影光效3",
                subType: "quality",
              },
              {
                displayName: "cinematic lighting4",
                name: "电影光效4",
                subType: "null",
              },
            ]}
          />
        </Panel>
        <Panel header="头饰" key="2" style={panelStyle}>
          111
        </Panel>
        <Panel header="眼睛" key="3" style={panelStyle}>
          111
        </Panel>
      </Collapse>

      <div>
        <Button htmlType="button" onClick={input}>
          导入
        </Button>
        <Button htmlType="button" onClick={output} style={{ marginLeft: 8 }}>
          导出
        </Button>
        <Button type="primary" onClick={onSubmit} style={{ marginLeft: 8 }}>
          生成
        </Button>
      </div>
    </>
  );
};

export default DetailEditing;
