import React, { useState, useEffect } from "react";

import StarRatingComponent from "react-star-rating-component";

const Test = () => {
  const [rating, setRating] = useState(0);

  const starMove = (e: number) => {
    setRating(e);
  };
  return (
    <div>
      <h2>Rating from state: {rating}</h2>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
        onStarClick={e => starMove(e)}
      />
    </div>
  );
};

export default Test;
