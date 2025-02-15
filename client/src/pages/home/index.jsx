import { getAllMovies } from "../../api/movies";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, message, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error while getting all movies ", err);
      message.error("Error while getting all movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log("SearchText: ", searchText);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("Movies: ", movies);
  return (
    <>
      <Row
        className="justify-content-center w-100"
        style={{ padding: "20px 15px 20px 0px" }}
      >
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Skeleton.Image
                  style={{ width: 200, height: 300, borderRadius: "8px" }}
                />
                <Skeleton active title={{ width: 120 }} paragraph={false} />
              </Col>
            ))
          : movies
              ?.filter((movie) =>
                movie.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((movie) => (
                <Col
                  className="gutter-row mb-5"
                  key={movie._id}
                  span={{
                    xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 6,
                  }}
                >
                  <div className="text-center">
                    <img
                      onClick={() => {
                        navigate(
                          `/movie/${movie._id}?date=${moment().format(
                            "YYYY-MM-DD"
                          )}`
                        );
                      }}
                      className="cursor-pointer"
                      src={movie.poster}
                      alt="Movie Poster"
                      width={200}
                      height={300}
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s",
                        objectFit: "cover",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <h3
                      onClick={() => {
                        navigate(
                          `/movie/${movie._id}?date=${moment().format(
                            "YYYY-MM-DD"
                          )}`
                        );
                      }}
                      className="cursor-pointer"
                    >
                      {movie.name}
                    </h3>
                  </div>
                </Col>
              ))}
      </Row>
    </>
  );
};

export default Home;
