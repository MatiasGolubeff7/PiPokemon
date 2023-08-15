import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Pagination.module.css";

const Pagination = ({ handlePage, page, ppp }) => {
  const totalPages = useSelector((state) => {
    return Math.ceil(state.allPokemons.length / ppp);
  });

  const [paginate, setPaginate] = useState([]);

  useEffect(() => {
    const arrayPage = [];
    for (let i = 0; i < totalPages; i++) {
      arrayPage.push(i);
    }
    setPaginate(arrayPage);
  }, [totalPages]);

  return (
    <div className={style.paginationContainer}>
      {page > 0 && (
        <button
          className={style.paginationButton}
          onClick={() => handlePage(page - 1)}
        >
          &#9664;
        </button>
      )}
      {paginate.map((p) => (
        <button
          key={p}
          className={`${style.paginationButton} ${
            p === page ? style.active : ""
          }`}
          onClick={() => handlePage(p)}
        >
          {p + 1}
        </button>
      ))}
      {page < totalPages - 1 && (
        <button
          className={style.paginationButton}
          onClick={() => handlePage(page + 1)}
        >
          &#9654;
        </button>
      )}
    </div>
  );
};

export default Pagination;
