import { useState, useEffect } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";
import { useForm } from "antd/es/form/Form";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin
          size="large"
          tip="Loading..."
          style={{ textAlign: "center", alignItems: "center" }}
        >
          <div style={{ minHeight: "50px" }} />
        </Spin>
      </div>
    );
  }

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);

      if (response && response.success) {
        localStorage.setItem("token", response.data);
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response?.message || "Login failed");
      }

      form.resetFields();
    } catch (err) {
      message.error(err.response?.data?.message || "An error accurred");
    }
  };

  return (
    <main className="App-header">
      <h1>Login to BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* email */}
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
          {/* password */}
          <Form.Item
            name="password"
            label="Password"
            htmlFor="password"
            className="d-block"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input type="password" placeholder="Enter your password"></Input>
          </Form.Item>
          <br />
          {/* button */}
          <Form.Item className="d-block">
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>
          New User ? <Link to="/register">Register Here</Link>
        </p>
        <p>
          Forgot Password ? <Link to="/forgot">Click Here</Link>{" "}
        </p>
      </section>
    </main>
  );
};

export default Login;
