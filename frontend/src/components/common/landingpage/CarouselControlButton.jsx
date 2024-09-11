import React from "react";
import "../../sass/StyledFeedBack.scss";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export const CarouselControlPrev = ({ onClick }) => (
  <button className="CarouselControlButton prev" onClick={onClick}>
    <GrPrevious />
  </button>
);

export const CarouselControlNext = ({ onClick }) => (
  <button className="CarouselControlButton next" onClick={onClick}>
    <GrNext />
  </button>
);

export default { CarouselControlPrev, CarouselControlNext };
