import React from "react";

const calcPercent = function(n1, nMax) {
  return (100 * n1) / nMax;
};

const colNumber = 12;
export const Col = function({ left, right, col, innerRef, ...rest }) {
  return (
    <div
      {...rest}
      ref={innerRef}
      style={{
        marginLeft: left ? `${calcPercent(left, colNumber)}%` : "0",
        marginRight: right ? `${calcPercent(right, colNumber)}%` : "0",
        width: `${calcPercent(col, colNumber)}%`
      }}
    />
  );
};
