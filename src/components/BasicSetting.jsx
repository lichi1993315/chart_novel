import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import "../App.css";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const BasicSetting = () => {
  const [form] = Form.useForm();

  const onStyleChange = (value) => {
    console.log(value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const input = () => {
    form.resetFields();
  };

  const output = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginTop: 36,
      }}
    >
      <Form.Item
        name="name"
        label="小说名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="style"
        label="文风"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="请选择文风" onChange={onStyleChange} allowClear>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </Form.Item>
      <Form.Item name="background" label="故事背景">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="role" label="输入角色">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button htmlType="button" onClick={input}>
          导入
        </Button>
        <Button htmlType="button" onClick={output} style={{ marginLeft: 8 }}>
          导出
        </Button>
        <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
          生成
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicSetting;
