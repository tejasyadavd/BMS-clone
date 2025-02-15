import { Tabs } from "antd";
import TheaterList from "./TheaterList";

const Partner = () => {
  const items = [
    {
      key: "1",
      label: "Theaters",
      children: <TheaterList />,
    },
  ];
  return (
    <>
      <h1>Partner Page</h1>
      <Tabs items={items} />
    </>
  );
};

export default Partner;
