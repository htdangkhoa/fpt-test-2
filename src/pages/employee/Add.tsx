import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Radio, Button, message } from "antd";
import { GetResponse } from "deta/dist/types/types/base/response";

import useDetaBase from "../../hooks/useDeta";
import { Employee } from "../../interfaces/Employee";
import usePrompt from "../../hooks/usePrompt";
import { routes } from "../../constants";

const Add = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const detaBase = useDetaBase("employees");

  const [loading, setLoading] = useState(false);

  const [changed, setChanged] = useState(false);

  usePrompt("Are you sure you want to leave without saving the changes?", changed);

  useEffect(() => {
    if (state?.id) {
      detaBase
        .get(state?.id)
        .then((result: GetResponse) => {
          form.setFieldsValue(result as any as Employee);
        })
        .catch((err) => message.error(err.message));
    }
  }, [state?.id]);

  const onFinish = useCallback(
    (values: any) => {
      setLoading(true);

      if (state?.id) {
        return detaBase
          .update(values, state?.id)
          .then(() => {
            message.success("Employee updated successfully.");

            navigate(routes.EMPLOYEE_LIST);
          })
          .catch((err) => message.error(err.message))
          .finally(() => setLoading(false));
      }

      detaBase
        .insert(values)
        .then(() => {
          message.success("Employee created");

          navigate(routes.EMPLOYEE_LIST);
        })
        .catch((err) => message.error(err.message))
        .finally(() => setLoading(false));
    },
    [state?.id],
  );

  return (
    <Form
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 9 }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      onFieldsChange={(newFields) => {
        if (!changed) {
          setChanged(true);
        }
      }}
    >
      <Form.Item
        label="First name"
        name={["first_name"]}
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="last_name"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Please input valid email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phone_number"
        rules={[{ required: true, min: 6, message: "Please input your phone number!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please choose your gender!" }]}>
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
