import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Radio, Button, message } from "antd";

import usePrompt from "../../hooks/usePrompt";
import { routes } from "../../constants";
import { AppDispatch, AppState } from "../../store";
import { createOrUpdateEmployee } from "../../api";

const Add = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { employees, loading } = useSelector((state: AppState) => state.employee);

  const { state } = useLocation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [changed, setChanged] = useState(false);

  usePrompt("Are you sure you want to leave without saving the changes?", changed);

  useEffect(() => {
    if (state?.id) {
      const employee = employees.find((employee) => employee.key === state?.id)

      if (employee) {
        form.setFieldsValue(employee);
      }
    }
  }, [state?.id]);

  const onFinish = useCallback(
    (values: any) => {
      setChanged(false);

      dispatch(createOrUpdateEmployee({ ...values, key: state?.id })).then(() => {

        const messageText = state?.id ? "Employee updated" : "Employee created";

        message.success(messageText);

        navigate(routes.EMPLOYEE_LIST);
      });
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
