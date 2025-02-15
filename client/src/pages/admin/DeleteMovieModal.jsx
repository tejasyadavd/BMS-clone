import { Modal, message } from "antd";
import { deleteMovie } from "../../api/movies";

const DeleteMovieModal = ({
  isDeletedModalOpen,
  setIsDeletedModalOpen,
  getData,
  selectedMovie,
  setSelectedMovie,
}) => {
  const handleOk = async () => {
    try {
      const movieId = selectedMovie._id;
      const response = await deleteMovie(movieId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedMovie(null);
      setIsDeletedModalOpen(false);
    } catch (err) {
      message.error(err.message);
      setIsDeletedModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDeletedModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title="Delete Movie"
      open={isDeletedModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      Are you sure you want to delete this movie?
    </Modal>
  );
};

export default DeleteMovieModal;
