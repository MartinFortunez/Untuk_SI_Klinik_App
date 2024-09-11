import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import "../../../sass/StyledFeedBack.scss";

const CardFeedBack = ({ data, className }) => {
  const { nama_pasien, penilaian, tgl_ulasan, rating, status } = data;

  const yellowStars = Math.floor(rating);
  const whiteStars = 5 - yellowStars;

  return (
    <Card className={`StyledCardFeedBack ${className}`}>
      <BiSolidQuoteLeft className="quote" />
      <Card.Body>
        <Row>
          <Col xs={12}>
            <p className="feedback">{penilaian}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={9}>
            <div>
              <div className="user">{nama_pasien}</div>
              <div className="role">{tgl_ulasan}</div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="stars-container">
              <div className="stars">
                {[...Array(yellowStars)].map((_, index) => (
                  <BsStarFill key={index} className="star yellow-star" />
                ))}
                {[...Array(whiteStars)].map((_, index) => (
                  <BsStarFill
                    key={index + yellowStars}
                    className="star white-star"
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CardFeedBack.propTypes = {
  feedback: PropTypes.shape({
    ulasan: PropTypes.string.isRequired,
    nama: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default CardFeedBack;
