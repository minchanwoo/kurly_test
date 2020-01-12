import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Axios from "axios";
import moment from "moment";

import StarRatingComponent from "react-star-rating-component";

import styles from "../../components/Table/index.module.css";
import Button from "../../components/Button";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductReviewList = (props: any) => {
  const [reviewList, setReviewList] = useState([]);
  const nick = useSelector((state: { nick: string }) => state.nick);

  useEffect(() => {
    Axios.get(
      `http://localhost:4000/product_reviews?productId=${props.match.params.id}`,
      {
        withCredentials: true
      }
    ).then(result => {
      setReviewList(result.data.result);
    });
  }, []);

  return (
    <div>
      <Title title="상품리뷰" />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>별점</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {reviewList.map((review: any) => {
            return (
              <tr key={review.id}>
                <td>{review.title}</td>
                <td dangerouslySetInnerHTML={{ __html: `${review.text}` }} />
                <td>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={review.rating}
                    renderStarIcon={() => <span></span>}
                    //emptyStarColor="#fff"
                  />
                </td>
                <td>{review.user.nick}</td>
                <td>{moment(review.createdAt).format("YY/MM/DD hh:mm")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {nick && (
        <Link to={`/products/${props.match.params.id}/new_review`}>
          <Button text="리뷰작성하기" />
        </Link>
      )}
    </div>
  );
};

export default withRouter(ProductReviewList);
