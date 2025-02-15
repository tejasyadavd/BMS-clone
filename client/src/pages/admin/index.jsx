import React from "react";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheaterTable from "./TheaterTable";

const Admin = () => {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MoviesList />,
    },
    {
      key: "2",
      label: "Theaters",
      children: <TheaterTable />,
    },
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
};

export default Admin;
