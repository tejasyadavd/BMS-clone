import { Button, message, Spin, Table } from "antd";
import { getAllTheaterForAdmin, updateTheater } from "../../api/theater";
import { useEffect, useState } from "react";

const TheaterTable = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllTheaterForAdmin();
      console.log("Response Success: ", response.success);
      if (response && response.success) {
        const allTheater = response.data;
        setTheaters(
          allTheater.map((item) => {
            return { ...item, key: `theater${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(response.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleStatusChange = async (theaters) => {
    try {
      setLoading(true);
      let values = {
        ...theaters,
        theaterId: theaters._id,
        isActive: !theaters.isActive,
      };

      const response = await updateTheater(values);
      console.log("Response: ", theaters);
      if (response && response.success) {
        message.success(response.message);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const tableHeading = [
    {
      title: "Theater Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <div>
      {theaters && theaters.length > 0 && (
        <Table dataSource={theaters} columns={tableHeading} />
      )}
    </div>
  );
};

export default TheaterTable;
