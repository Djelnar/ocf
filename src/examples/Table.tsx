import DoomScroll from "doom-scroll";
import React, { useState } from "react";
import { useEffect } from "react";
import { data } from "./data";
import styles from "./table.module.css";

const Table = () => {
  const [time, setTime] = useState(1000000);
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <DoomScroll
      items={data}
      getKey={(item) => item.id}
      renderItem={({ item }) => (
        <div className={styles.row}>
          <div className={styles.col}>{item.id}</div>
          <div className={styles.col}>{item.firstName}</div>
          <div className={styles.col}>{item.middleName}</div>
          <div className={styles.col}>{item.lastName}</div>
          <div className={styles.col}>{item.age}</div>
          <div className={styles.col}>{item.county}</div>
          <div className={styles.col}>{item.cat}</div>
          <button className={styles.col}>call</button>
          <input className={styles.col} type="checkbox" />
          <select className={styles.col}>
            <option>gender</option>
            <option>male</option>
            <option>female</option>
          </select>
          <div className={styles.col}>{time}</div>
        </div>
      )}
    />
  );
};

export default Table;
