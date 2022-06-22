import classNames from "classnames";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";

type Props<T> = {
  items: T[];
  getKey: (item: T) => string;
  component: (props: {
    item: T;
    style: React.CSSProperties;
    className: string;
    onChangeHeight: (index: number, height: number) => void;
    index: number;
  }) => JSX.Element;
  itemClassName?: string;
  initialMetadata: { height: number }[];
};

const VariableSizeList = <T,>({
  getKey,
  items,
  component: Component,
  itemClassName,
  initialMetadata,
}: Props<T>) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);

  const [metadata, setMetadata] = useState(initialMetadata);
  const handleChangeHeight = useCallback((index: number, height: number) => {
    setMetadata((md) => {
      const smd = md.slice();
      smd[index].height = height;
      return smd;
    });
  }, []);

  const offsets = useMemo(() => {
    let acc = 0;
    return [
      0,
      ...metadata.map(({ height }, index) => {
        acc = acc + height;
        return acc;
      }),
    ];
  }, [metadata]);

  const rowHeightSum = metadata.reduce((a, b) => a + b.height, 0);

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
      <div style={{ height: rowHeightSum }}>
        {items.map((item, index) => {
          const top = offsets[index];

          const isVisible =
            top >= scrollY - rootHeight * 0.5 &&
            top <= scrollY + rootHeight * 1.5;

          return (
            isVisible && (
              <Component
                key={getKey(item)}
                item={item}
                style={{ height: metadata[index].height, top }}
                className={classNames(itemClassName, styles.item)}
                onChangeHeight={handleChangeHeight}
                index={index}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default VariableSizeList;
