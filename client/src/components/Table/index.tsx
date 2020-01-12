import React from "react";
import moment from "moment";

import styles from "./index.module.css";
import Axios from "axios";

interface IProductQuestionProps {
  id: number;
  productQuestionId: number;
}

interface IProductQuestion {
  id: number;
  title: string;
  text: string;
  user: { nick: string };
  createdAt: Date;
  open: boolean;
  product_question_reads: IProductQuestionProps[];
}

const Table = ({
  productQuestion,
  setProductQuestion
}: {
  productQuestion: IProductQuestion[];
  setProductQuestion: any;
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {productQuestion.map((pro: IProductQuestion) => {
          return [
            <tr
              key={pro.id}
              style={{ cursor: "pointer" }}
              onClick={async () => {
                const new_list = [...productQuestion];
                new_list.forEach((p: any) => {
                  if (p.id === pro.id) {
                    if (p.open === false) {
                      p.product_question_reads.length += 1;
                    }
                    p.open = !p.open;
                  }
                });
                if (pro.open === true) {
                  await Axios.post(
                    `http://localhost:4000/product_questions/${pro.id}/read`
                  );
                }
                setProductQuestion(new_list);
              }}
            >
              <td>{pro.id}</td>
              <td>{pro.title}</td>
              <td>{pro.user.nick}</td>
              <td>{moment(pro.createdAt).format("YYYY/MM/DD hh:mm")}</td>
              <td>{pro.product_question_reads.length}</td>
            </tr>,
            <tr className={styles.question_text} key={`${pro.id}-text`}>
              {pro.open && (
                <td
                  colSpan={5}
                  dangerouslySetInnerHTML={{ __html: `${pro.text}` }}
                />
              )}
            </tr>
          ];
        })}
      </tbody>
    </table>
  );
};

export default Table;
