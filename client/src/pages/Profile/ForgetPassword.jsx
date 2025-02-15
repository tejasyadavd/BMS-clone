import React, { useEffect } from "react";
import { forgetPassword } from "../../api/users";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { Button, Form, Input, message, Spin } from "antd";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loaders.loading);

  const onFinish = async (values) => {
    console.log("on Finish values: ", values);
    try {
      dispatch(ShowLoading());
      const response = await forgetPassword(values);

      if (response.success) {
        message.success(response.message);
        alert("OTP sent to your email");
        navigate(`/reset/${encodeURIComponent(values.email)}`);
      } else {
        console.log(
          "Error while calling custom forgot password instances: ",
          response.message
        );
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      console.log("Error: ", err);
      message.error(err.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    dispatch(ShowLoading());
    if (localStorage.getItem("token")) {
      navigate("/");
    }

    setTimeout(() => {
      dispatch(HideLoading());
    }, 2000);
  }, [dispatch, navigate]);

  return (
    <>
      {loading && (
        <div className="fullPage-loader-container">
          <Spin tip="Loading..." size="large">
            <div style={{ minHeight: "50px" }} />
          </Spin>
        </div>
      )}

      {!loading && (
        <header className="App-header">
          <main className="main-area mw-500 text-center px-3">
            <section className="left-section">
              <h1>Forgot Password</h1>
            </section>
            <section className="right-section">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Email"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter your Email"
                  ></Input>
                </Form.Item>

                <Form.Item className="d-block">
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                  >
                    Send OTP
                  </Button>
                </Form.Item>
              </Form>

              <div>
                <p>
                  Existing User ? <Link to="/login">Login Here</Link>
                </p>
              </div>
            </section>
          </main>
        </header>
      )}
    </>
  );
};

export default ForgetPassword;
