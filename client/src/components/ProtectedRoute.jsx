import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { setUser } from "../redux/userSlice";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import { message, Layout, Menu, Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  console.log("Children: ", children);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loaders.loading);

  // NavItems
  const navItems = [
    { label: "Home", icon: <HomeOutlined /> },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const { Header, Footer } = Layout;

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetCurrentUser();

        if (!response.success) {
          message.error(response.message);
          localStorage.removeItem("token");
          dispatch(setUser(null));
          navigate("/login");
        } else {
          message.success(response.message);
          dispatch(setUser(response.data));
        }
      } catch (err) {
        message.error("Please Login again");
        localStorage.removeItem("token");

        dispatch(setUser(null));
        navigate("/login");
      } finally {
        dispatch(HideLoading());
      }
    };

    // check the current user token from the local storage else navigate them to login page
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    user && (
      <>
        {/* This protectedRoute component will have a layout for the menu, and navigation */}
        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0">BookMyShow</h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>
          {/* The section to render any child component */}
          <div
            style={{
              padding: 24,
              flex: "1",
              minHeight: 300,
              background: "#fff",
            }}
          >
            {children}
          </div>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#A0A0A0",
              color: "white",
              padding: "20px 50px",
            }}
          >
            <div>
              <p style={{ fontSize: "16px", marginBottom: "5px" }}>
                &copy; {new Date().getFullYear()} BookMyShow Clone. All rights
                reserved.
              </p>
            </div>
          </Footer>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
