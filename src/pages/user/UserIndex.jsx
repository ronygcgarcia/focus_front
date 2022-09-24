import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/authService";

const columns = [
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
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const UserIndexComponent = () => {
  const [users, setUsers] = useState([]);

  async function userIndex() {
    const userResponse = await getUsers();
    console.log(userResponse);
    const users = userResponse.map((user) => ({
      key: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user?.roles[0],
    }));
    setUsers(users);
  }

  useEffect(() => {
    userIndex();
  }, []);
  return (
    <div>
      <div className="site-link-button">
        <Link to="/users/create" className="ant-btn ant-btn-default">
          Create user
        </Link>
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};
export default UserIndexComponent;
