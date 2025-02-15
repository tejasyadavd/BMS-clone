import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllBookings } from "../../api/booking";
import { Link } from "react-router-dom";
import { Button, message, Card, Row, Col, Spin } from "antd";
import moment from "moment";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings({ userId: user._id });
      console.log("get all bookings response: ", response.data);

      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <>
      {bookings && (
        <Row gutter={24}>
          {bookings.map((booking) => {
            return (
              <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
                <Card className="mb-3">
                  <div className="d-flex flex-column-mob">
                    <div className="flex-shrink-0">
                      <img
                        src={booking.show.movie.poster}
                        alt="Movie Poster"
                        width={100}
                      />
                    </div>
                    <div className="show-details flex-1">
                      <h3 className="mt-0 mb-0">{booking.show.movie.name}</h3>
                      <p>
                        Theater: <b>{booking.show.theater.name}</b>
                      </p>
                      <p>
                        Seats: <b>{booking.seats.join(", ")}</b>
                      </p>
                      <p>
                        Date & Time:{" "}
                        <b>
                          {moment(booking.show.date, "YYYY-MM-DD").format(
                            "MMM Do YYYY"
                          )}{" "}
                          {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                        </b>
                      </p>
                      <p>
                        Amount:{" "}
                        <b>
                          Rs.{booking.seats.length * booking.show.ticketPrice}
                        </b>
                      </p>
                      <p>
                        Booking ID: <b>{booking.transactionId}</b>
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {!bookings.length && (
        <div className="text-center pt-3">
          <h1>You've not booked any show yet!</h1>
          <Link to="/">
            {" "}
            <Button type="primary">Start Booking</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Booking;
