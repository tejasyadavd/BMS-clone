import { useEffect } from "react";
import { resetPassword } from "../../api/users";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { Button, Form, Input, message, Spin } from "antd";

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loaders.loading);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await resetPassword(values, email);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        alert("Invalid OTP");
        message.error(response.message || "Failed to reset password");
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message || "Something went wrong");
    } finally {
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
              <h1>Reset Password</h1>
            </section>

            <section className="right-section">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="OTP"
                  htmlFor="otp"
                  name="otp"
                  className="d-block"
                  rules={[{ required: true, message: "OTP is required" }]}
                >
                  <Input
                    id="otp"
                    type="number"
                    placeholder="Enter your otp"
                  ></Input>
                </Form.Item>

                <Form.Item
                  label="Password"
                  htmlFor="password"
                  name="password"
                  className="d-block"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  ></Input>
                </Form.Item>

                <Form.Item className="d-block">
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </section>
          </main>
        </header>
      )}
    </>
  );
};

export default ResetPassword;
