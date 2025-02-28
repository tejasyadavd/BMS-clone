import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getShowById } from "../../api/shows";
import { message, Card, Row, Col, Button, Spin } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from "../../api/booking";

const BookShow = () => {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await getShowById({ showId: params.id });

        if (response.success) {
          setShow(response.data);
        } else {
          message.error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Function to generate seat layout dynamically
  const getSeats = () => {
    let columns = window.innerWidth > 768 ? 12 : 6; // Number of columns for seating arrangement
    let totalSeats = show.totalSeats; // Total number of seats
    let rows = Math.ceil(totalSeats / columns); // Calculating number of rows

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">Screen this side</p>
          <div className="screen-div">
            {/* Placeholder for screen display */}
          </div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) =>
            // Mapping rows
            Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1; // Calculating seat number

              let seatClass = "seat-btn"; // Default class for seat button
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected"; // seat-btn selected Adding 'selected' class if seat is selected
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked"; // Adding 'booked' class if seat is already booked
              }
              if (seatNumber <= totalSeats) {
                return (
                  <li key={seatNumber}>
                    <button
                      className={seatClass}
                      onClick={() => {
                        // Function to handle seat selection/deselection
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
              }
            })
          )}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const onToken = async (token) => {
    console.log("token: ", token);

    try {
      setLoading(true);
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice
      );

      if (response && response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response?.message || "Payment failed, please try again");
      }
    } catch (err) {
      message.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const book = async (transactionId) => {
    try {
      setLoading(true);
      const response = await bookShow({
        show: params.id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });

      if (response.success) {
        message.success(response.message);
        navigate("/profile");
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

  if (loading) {
    return (
      <div className="fullPage-loader-container">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <>
      {show && (
        <Row gutter={24} justify="center">
          <Col xs={24} lg={18}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.name}</h1>
                  <p>
                    Theatre: {show.theater.name}, {show.theater.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {/* Rendering dynamic seat layout */}
              {getSeats()}

              {selectedSeats.length > 0 && (
                <StripeCheckout
                  name="Book Ticket"
                  token={onToken}
                  amount={selectedSeats.length * show.ticketPrice * 100}
                  stripeKey={stripePublicKey}
                >
                  <div style={{ width: "9rem", marginLeft: "35%" }}>
                    <Button type="primary" shape="default" size="large">
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookShow;
