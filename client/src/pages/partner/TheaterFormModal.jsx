import React, { useState } from "react";
import { Form, Modal, Row, Col, message, Input, Button, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

import { addTheater, updateTheater } from "../../api/theater";

const TheaterFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheater,
  setSelectedTheater,
  formType,
  getData,
}) => {
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let response = null;
      if (formType === "add") {
        response = await addTheater({ ...values, owner: user._id });
      } else {
        values.theaterId = selectedTheater._id;
        response = await updateTheater(values);
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      setSelectedTheater(null);
    } catch (error) {
      message.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleCancle = () => {
    setIsModalOpen(false);
    setSelectedTheater(null);
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
        title={formType === "add" ? "Add Theater" : "Edit Theater"}
        open={isModalOpen}
        onCancel={handleCancle}
        width={800}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={selectedTheater}
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
            <Col span={24}>
              <Form.Item
                label="Theater Name"
                name="name"
                rules={[
                  { required: true, message: "Theater name is required" },
                ]}
              >
                <Input placeholder="Enter the theater name" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Theater Address"
                name="address"
                rules={[
                  { required: true, message: "Theater address is required" },
                ]}
              >
                <TextArea
                  id="address"
                  rows={3}
                  placeholder="Enter the theater address"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Email is required" }]}
                  >
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter the email"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true, message: "Phone number is required" },
                    ]}
                  >
                    <Input
                      type="number"
                      id="number"
                      placeholder="Enter the contact number"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Submit the Data
            </Button>
            <Button className="mt-3" block onClick={handleCancle}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TheaterFormModal;
