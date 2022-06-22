import classNames from "classnames";
import { VariableSizeList } from "doom-scroll";
import React, { Fragment, useEffect, useRef } from "react";
import styles from "./cards.module.css";
import { data } from "./data";

type CardProps = {
  item: typeof data[0];
  style: React.CSSProperties;
  className: string;
  onChangeHeight: (index: number, height: number) => void;
  index: number;
};

const metadata = data.map((item, index) => ({
  height: 150,
}));

const Card = ({ className, item, style, index, onChangeHeight }: CardProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      const { height } = itemRef.current.getBoundingClientRect();
      onChangeHeight(index, height);
    }
  }, [onChangeHeight, index]);

  return (
    <div className={classNames(styles.card, className)} style={style}>
      <div className={styles.cardInner} ref={itemRef}>
        {Array.from(Array(+item.age).keys()).map((i) => (
          <div key={i}>Data</div>
        ))}
        {Object.entries(item).map(([k, v]) => (
          <Fragment key={k}>
            <input type="checkbox" />
            <input defaultValue={v} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

type Props = {};

const Cards = (props: Props) => {
  return (
    <VariableSizeList
      items={data}
      getKey={(item) => item.id}
      component={Card}
      initialMetadata={metadata}
    />
  );
};

export default Cards;
