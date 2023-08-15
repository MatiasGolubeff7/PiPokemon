import React, { useEffect } from "react";
import { getTypes, typeFilter } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./TypesFilter.module.css";

const TypesFilter = ({ setPage }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (type) => {
    setPage(0);
    dispatch(typeFilter(type));
  };

  const firstRow = types.slice(0, 10);
  const secondRow = types.slice(10, 20);

  return (
    <div className={style.filterContainer}>
      <h2 className={style.filterTitle}>FILTERS</h2>

      <div className={style.filterButtons}>
        <button
          onClick={() => handleFilter("all")}
          className={`${style.filterButton} ${style.all}`}
        >
          ALL
        </button>
        {firstRow.map((t, i) => (
          <button
            key={i}
            className={style.filterButton}
            onClick={() =>
              filter === t.name ? handleFilter("all") : handleFilter(t.name)
            }
          >
            {t.name.toUpperCase()}
          </button>
        ))}
      </div>
      <div className={style.filterButtons}>
        {secondRow.map((t, i) => (
          <button
            key={i}
            className={style.filterButton}
            onClick={() =>
              filter === t.name ? handleFilter("all") : handleFilter(t.name)
            }
          >
            {t.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypesFilter;
