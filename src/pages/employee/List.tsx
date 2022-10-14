import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, TableColumnsType, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { Employee } from "../../interfaces/Employee";
import { routes } from "../../constants";
import { deleteEmployee, getEmployees } from "../../api";
import { AppDispatch, AppState } from "../../store";

const List = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading } = useSelector((state: AppState) => state.employee)

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const onAdd = () => navigate(routes.EMPLOYEE_ADD);

  const onEdit = (id: string) => {
    const path = routes.EMPLOYEE_EDIT.replace(":id", id);

    navigate(path, { state: { id } });
  };

  const onDelete = useCallback((id: string) => {
    Modal.confirm({
      title: `Are you sure delete Employee #${id}?`,
      onOk: () => dispatch(deleteEmployee(id))
    });
  }, []);

  const columns = useMemo<TableColumnsType<Employee>>(
    () => [
      {
        title: "First name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Last name",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone number",
        dataIndex: "phone_number",
        key: "phone_number",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => onEdit(record.key!)}>
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(record.key!)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: "1rem" }} onClick={onAdd}>
        Add
      </Button>

      <Table loading={loading} columns={columns} dataSource={employees} />
    </div>
  );
};

export default List;
