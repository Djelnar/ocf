import React, { useRef } from "react";

type TProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (props: { item: T }) => JSX.Element;
};

const DoomScroll = <T,>({ getKey, items, renderItem }: TProps<T>) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={rootRef}>
      {items.map((item) => (
        <div key={getKey(item)}>{renderItem({ item })}</div>
      ))}
    </div>
  );
};

export default DoomScroll;
