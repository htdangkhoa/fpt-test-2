import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { Button, Space, Table, TableColumnsType, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useDetaBase from "../../hooks/useDeta";
import { Employee } from "../../interfaces/Employee";
import { routes } from "../../constants";

const List = () => {
  const navigate = useNavigate();

  const detaBase = useDetaBase("employees");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<FetchResponse>({
    items: [],
    last: undefined,
    count: 0,
  });

  const fetchEmployees = useCallback(() => {
    setLoading(true);

    detaBase
      .fetch()
      .then(setData)
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const onAdd = () => navigate(routes.EMPLOYEE_ADD);

  const onEdit = (id: string) => {
    const path = routes.EMPLOYEE_EDIT.replace(":id", id);

    navigate(path, { state: { id } });
  };

  const onDelete = useCallback((id: string) => {
    Modal.confirm({
      title: `Are you sure delete Employee #${id}?`,
      onOk: () =>
        detaBase
          .delete(id)
          .then(fetchEmployees)
          .catch((err) => message.error(err.message)),
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

      <Table loading={loading} columns={columns} dataSource={data.items as unknown as Employee[]} />
    </div>
  );
};

export default List;
