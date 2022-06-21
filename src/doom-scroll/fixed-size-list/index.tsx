import React, { MouseEventHandler, useRef, useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { useEffect } from "react";

type TProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  component: (props: {
    item: T;
    style: React.CSSProperties;
    className: string;
  }) => JSX.Element;
  itemClassName?: string;
  itemHeight: number;
};

const FixedSizeList = <T,>({
  getKey,
  items,
  component: Component,
  itemClassName,
  itemHeight,
}: TProps<T>) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);

  // Track container height
  useEffect(() => {
    const cb = () => {
      const height = rootRef.current?.getBoundingClientRect().height || 1000;
      setRootHeight(height);
    };

    cb();
    window.addEventListener("resize", cb);

    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);

  const handleScroll: MouseEventHandler<HTMLDivElement> = (e) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  return (
    <div className={styles.root} ref={rootRef} onScroll={handleScroll}>
      <div style={{ height: itemHeight * items.length }}>
        {items.map((item, index) => {
          const top = itemHeight * index;

          const isVisible =
            top >= scrollY - rootHeight * 0.5 &&
            top <= scrollY + rootHeight * 1.5;

          return (
            isVisible && (
              <Component
                key={getKey(item)}
                item={item}
                style={{ height: itemHeight, top }}
                className={classNames(itemClassName, styles.item)}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default FixedSizeList;
