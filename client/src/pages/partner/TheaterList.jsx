import { useState, useEffect } from "react";
import { Table, message, Button, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteTheaterModal from "./DeleteTheaterModal";
import TheaterFormModal from "./TheaterFormModal";
import { getAllTheater } from "../../api/theater";
import { useSelector } from "react-redux";
import ShowModal from "./ShowModal";

const TheaterList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theaters, setTheaters] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const { user } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      if (!user?._id) {
        throw new Error("User Id is missing");
      }
      const response = await getAllTheater(user._id);
      if (response.success) {
        const allTheaters = response.data;

        setTheaters(
          allTheaters.map(function (item) {
            return { ...item, key: `theater ${item._id}` };
          })
        );
      } else {
        message.error(response.message || "Failed to fetch theaters");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          return `Approved`;
        } else {
          return `Pending/ Blocked`;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheater(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheater(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheater(data);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theater
        </Button>
      </div>
      <Table dataSource={theaters} columns={columns} />
      {isModalOpen && (
        <TheaterFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          setIsShowModalOpen={setIsShowModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheaterModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheatre={selectedTheater}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheatre={setSelectedTheater}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheater={selectedTheater}
        />
      )}
    </>
  );
};

export default TheaterList;
