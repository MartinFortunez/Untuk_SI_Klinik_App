import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Carousel } from "react-bootstrap";
import CardFeedBack from "../cards/landingpage/CardFeedBack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  CarouselControlPrev,
  CarouselControlNext,
} from "./CarouselControlButton";
import FormAddFeedBack from "./FormAddFeedBack";
import "../../sass/StyledFeedBack.scss";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFetch";

const FeedBack = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);
  const { data, isSuccess } = useFetch("feedback", "feedbackData");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setCardsPerSlide(1);
      } else {
        setCardsPerSlide(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <div className="StyledFeedBack">
      <div className="Title">Ulasan Pasien</div>
      <Container>
        <Carousel
          prevIcon={<CarouselControlPrev />}
          nextIcon={<CarouselControlNext />}
        >
          {data ? (
            Array.from(
              { length: Math.ceil(data.length / cardsPerSlide) },
              (_, i) => {
                const startIndex = i * cardsPerSlide;
                const endIndex = startIndex + cardsPerSlide;
                const filteredData = data
                  .slice(startIndex, endIndex)
                  .filter((item) => item.status === "on");
                return (
                  <Carousel.Item key={i}>
                    <div className="d-flex justify-content-around">
                      {filteredData.map((item) => (
                        <CardFeedBack key={item.ulasan_id} data={item} />
                      ))}
                    </div>
                  </Carousel.Item>
                );
              }
            )
          ) : (
            <p>Loading...</p>
          )}
        </Carousel>
        <div className="d-flex justify-content-center mt-3">
          <Button className="CustomButton" onClick={handleAddShow}>
            Kirim Feedback
          </Button>
        </div>
        <FormAddFeedBack
          show={showAddModal}
          handleClose={handleAddClose}
          data={data}
        />
      </Container>
    </div>
  );
};

export default FeedBack;
