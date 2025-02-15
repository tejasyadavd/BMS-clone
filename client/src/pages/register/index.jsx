import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Radio, Spin } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin tip="Loading..." size="large">
          <div style={{ minHeight: "60px" }} />
        </Spin>
      </div>
    );
  }

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await RegisterUser(values);
      console.log(response);
      if (response && response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Register to BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input type="text" placeholder="Enter your name"></Input>
            </Form.Item>

            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input type="text" placeholder="Enter your email"></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input type="password" placeholder="Enter your password"></Input>
            </Form.Item>

            <Form.Item
              label="Register as a partner"
              htmlFor="role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <div className="d-flex justify-content-center">
                <Radio.Group>
                  <Radio value={"partner"}>Yes</Radio>
                  <Radio value={"user"}>No</Radio>
                </Radio.Group>
              </div>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              Already a user ? <Link to="/login">Login</Link>{" "}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
