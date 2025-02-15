import { Table, Button, Spin } from "antd";
import React from "react";
import MovieForm from "./MovieForm";
import { getAllMovies } from "../../api/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import DeleteMovieModal from "./DeleteMovieModal";

const MoviesList = () => {
  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",

      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
            alt="Movie_Img"
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => {
        return `${text} min`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (text, data) => {
        return `${text}`;
      },
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (text, data) => {
        return `${text}`;
      },
    },
    {
      title: "Release Date",
      dataIndex: "releaseData",
      key: "releaseData",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YY");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeletedModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie${item._id}` };
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-end">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      {isDeletedModalOpen && (
        <DeleteMovieModal
          isDeletedModalOpen={isDeletedModalOpen}
          setIsDeletedModalOpen={setIsDeletedModalOpen}
          getData={getData}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
};

export default MoviesList;
