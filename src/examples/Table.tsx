import classNames from "classnames";
import { FixedSizeList } from "doom-scroll";
import React, { useEffect, useState } from "react";
import { data } from "./data";
import styles from "./table.module.css";

type TableRowProps = {
  item: typeof data[0];
  style: React.CSSProperties;
  className: string;
};
const TableRow = ({ item, className, style }: TableRowProps) => {
  const [time, setTime] = useState(1000000);
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className={classNames(styles.row, className)} style={style}>
      <input className={styles.col} type="checkbox" />
      <div className={styles.col}>{item.firstName}</div>
      <div className={styles.col}>{item.middleName}</div>
      <div className={styles.col}>{item.lastName}</div>
      <div className={styles.col}>{item.age}</div>
      <div className={styles.col}>{item.county}</div>
      <div className={styles.col}>{item.cat}</div>
      <button>call</button>
      <div className={styles.col}>{time}</div>
      <select>
        <option>gender</option>
        <option>male</option>
        <option>female</option>
      </select>
    </div>
  );
};

const Table = () => {
  return (
    <FixedSizeList
      itemHeight={36}
      items={data}
      getKey={(item) => item.id}
      component={TableRow}
    />
  );
};

export default Table;
