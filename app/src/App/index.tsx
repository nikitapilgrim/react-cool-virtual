/* import { Fragment, useState } from "react";
import useVirtual from "react-cool-virtual";
import { v4 as uuidv4 } from "uuid";

import "normalize.css";
import styles from "./styles.module.scss";

const sleep = (time: number) =>
  // eslint-disable-next-line compat/compat
  new Promise((resolve) => setTimeout(resolve, time));

const getMockData = (count: number, min = 25) =>
  // eslint-disable-next-line no-plusplus
  new Array(count).fill({}).map((_, idx) => ({
    text: uuidv4(),
    size: min + Math.round(Math.random() * 100),
  }));

const rowHeights = getMockData(100000);
const colWidths = getMockData(100000, 75);

export default (): JSX.Element => {
  const [sz, setSz] = useState(25);
  const row = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount: rowHeights.length,
    // overscanCount: 0,
  });
  const col = useVirtual<HTMLDivElement, HTMLDivElement>({
    horizontal: true,
    itemCount: colWidths.length,
    // overscanCount: 0,
  });

  return (
    <div className={styles.app}>
      <div
        className={styles.outer}
        ref={(el) => {
          row.outerRef.current = el;
          col.outerRef.current = el;
        }}
      >
        <div
          style={{ position: "relative" }}
          ref={(el) => {
            row.innerRef.current = el;
            col.innerRef.current = el;
          }}
        >
          {row.items.map((rowItem) => (
            <Fragment key={rowItem.index}>
              {col.items.map((colItem) => (
                <div
                  key={colItem.index}
                  className={`${styles.item} ${
                    // eslint-disable-next-line no-nested-ternary
                    rowItem.index % 2
                      ? colItem.index % 2
                        ? styles.dark
                        : ""
                      : !(colItem.index % 2)
                      ? styles.dark
                      : ""
                  }`}
                  style={{
                    position: "absolute",
                    height: `${rowHeights[rowItem.index].size}px`,
                    width: `${colWidths[colItem.index].size}px`,
                    // height: `${
                    //   rowItem.index ? rowHeights[rowItem.index].size : sz
                    // }px`,
                    // width: `${
                    //   colItem.index ? colWidths[colItem.index].size : sz
                    // }px`,
                    transform: `translateX(${colItem.start}px) translateY(${rowItem.start}px)`,
                  }}
                  ref={(el) => {
                    rowItem.measureRef(el);
                    colItem.measureRef(el);
                  }}
                >
                  {rowItem.index}, {colItem.index}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setSz((prev) => (prev === 25 ? 250 : 25))}
      >
        Resize
      </button>
    </div>
  );
}; */

import { useState } from "react";
import useVirtual from "react-cool-virtual";
import { v4 as uuidv4 } from "uuid";

import "normalize.css";
import styles from "./styles.module.scss";

const sleep = (time: number) =>
  // eslint-disable-next-line compat/compat
  new Promise((resolve) => setTimeout(resolve, time));

const getMockData = (count: number, min = 25) =>
  // eslint-disable-next-line no-plusplus
  new Array(count).fill({}).map((_, idx) => ({
    text: uuidv4(),
    size: min + Math.round(Math.random() * 150),
  }));

const mockData = getMockData(15);

export default (): JSX.Element => {
  const [itemCount, setItemCount] = useState(mockData.length);
  const { outerRef, innerRef, items, scrollToItem } = useVirtual<
    HTMLDivElement,
    HTMLDivElement
  >({
    itemCount,
    stickyIndices: [0, 5],
    overscanCount: 0,
  });

  return (
    <div className={styles.app}>
      <div className={styles.outer} ref={outerRef}>
        <div ref={innerRef}>
          {items.map(({ index, size, isSticky }) => {
            let style: any = { height: `${size}px` };
            // Use the `isSticky` property to style the sticky item, that's it ✨
            style = isSticky
              ? { ...style, position: "sticky", top: "0" }
              : style;

            return (
              <div
                key={index}
                className={`${styles.item} ${index % 2 ? styles.dark : ""}`}
                style={style}
              >
                {index}
              </div>
            );
          })}
        </div>
      </div>
      <button type="button" onClick={() => scrollToItem(11)}>
        Scroll To...
      </button>
    </div>
  );
};
