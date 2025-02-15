import { Modal, message, Spin } from "antd";
import { useState } from "react";
import { deleteTheater } from "../../api/theater";

const DeleteTheaterModal = ({
  isDeleteModalOpen,
  selectedTheatre,
  setIsDeleteModalOpen,
  setSelectedTheatre,
  getData,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const theaterId = selectedTheatre._id;
      const response = await deleteTheater(theaterId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedTheatre(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error(error.message);
      setIsDeleteModalOpen(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <>
      <Modal
        centered
        title="Delete Theater"
        open={isDeleteModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theater?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theater data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteTheaterModal;
