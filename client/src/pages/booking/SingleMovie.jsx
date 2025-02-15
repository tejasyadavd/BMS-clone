import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { message, Input, Divider, Row, Col, Spin } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAllTheatersByMovie } from "../../api/shows";

const SingleMovie = () => {
  const params = useParams();
  console.log(params);
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log("Redux Loading State: ", loading);

  const handleDate = (event) => {
    const inputValue = event.target.value;

    if (!inputValue) {
      alert(
        "The selected date is not valid for booking. Please choose a valid date from the available options."
      );
      return;
    }
    const selectedDate = moment(inputValue).format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    if (selectedDate < today) {
      alert("You cannot select a past date!");
      return;
    }
    setDate(selectedDate);
    navigate(`/movie/${params.id}?date=${event.target.value}`);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const getAllTheaters = async () => {
    try {
      setLoading(true);
      const response = await getAllTheatersByMovie({ movie: params.id, date });
      if (response.success) {
        setTheaters(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getAllTheaters();
  }, [date]);

  return (
    <>
      {loading && (
        <div className="fullPage-loader-container">
          <Spin size="default" />
        </div>
      )}
      {!loading && (
        <div className="inner-container">
          {movie && (
            <div className="d-flex single-movie-div">
              <div className="flex-Shrink-0 me-3 single-movie-img">
                <img src={movie.poster} width={150} alt="Movie Poster" />
              </div>
              <div className="w-100">
                <h1 className="mt-0">{movie.name}</h1>
                <p className="movie-data">
                  Language: <span>{movie.language}</span>
                </p>
                <p className="movie-data">
                  Genre: <span>{movie.genre}</span>
                </p>
                <p className="movie-data">
                  Release Date:{" "}
                  <span>{moment(movie.date).format("MMM Do YYYY")}</span>
                </p>
                <p className="movie-data">
                  Duration: <span>{movie.duration} Minutes</span>
                </p>
                <hr />
                <div className="d-flex flex-column-mob align-items-center mt-3">
                  <label className="me-3 flex-shrink-0">Choose the date:</label>
                  <Input
                    onChange={handleDate}
                    type="date"
                    min={moment().format("YYYY-MM-DD")}
                    className="max-width-300 mt-8px-mob"
                    value={date}
                    placeholder="default size"
                    prefix={<CalendarOutlined />}
                  />
                </div>
              </div>
            </div>
          )}
          {theaters.length === 0 && (
            <div className="pt-3">
              <h2 className="blue-clr">
                Currently, no theatres available for this movie!
              </h2>
            </div>
          )}
          {theaters.length > 0 &&
            moment(date).isSameOrAfter(moment(), "day") && (
              <div className="theatre-wrapper mt-3 pt-3">
                <h2>Theaters</h2>
                {theaters.map((theater) => {
                  // Filter out past shows
                  const upcomingShows = theater.shows.filter((singleShow) => {
                    const showDateTime = moment(
                      `${date} ${singleShow.time}`,
                      "YYYY-MM-DD HH:mm"
                    );
                    const currentTime = moment();

                    return showDateTime.isAfter(currentTime);
                  });

                  if (upcomingShows.length === 0) return null;

                  return (
                    <div key={theater._id}>
                      <Row gutter={24} key={theater._id}>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                          <h3>{theater.name}</h3>
                          <p>{theater.address}</p>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                          <ul className="show-ul">
                            {upcomingShows
                              .sort(
                                (a, b) =>
                                  moment(
                                    `${date} ${a.time}`,
                                    "YYYY-MM-DD HH:mm"
                                  ) -
                                  moment(
                                    `${date} ${b.time}`,
                                    "YYYY-MM-DD HH:mm"
                                  )
                              )
                              .map((singleShow) => {
                                const showDateTime = moment(
                                  `${date} ${singleShow.time}`,
                                  "YYYY-MM-DD HH:mm"
                                );
                                const currentTime = moment();
                                const isPast =
                                  showDateTime.isBefore(currentTime);

                                return (
                                  <li
                                    key={singleShow._id}
                                    onClick={
                                      !isPast
                                        ? () =>
                                            navigate(
                                              `/book-show/${singleShow._id}`
                                            )
                                        : null
                                    }
                                    style={{
                                      color: isPast ? "grey" : "black",
                                      pointerEvents: isPast ? "none" : "auto",
                                      cursor: isPast
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    {moment(singleShow.time, "HH:mm").format(
                                      "hh:mm A"
                                    )}
                                  </li>
                                );
                              })}
                          </ul>
                        </Col>
                      </Row>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      )}
    </>
  );
};
export default SingleMovie;
