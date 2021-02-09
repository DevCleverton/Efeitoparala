import React from "react";
import cn from "classnames";

const Anchor = props => <a {...props} />;
const Butt = props => <button {...props} />;

export const Button = function({ filled, plused, ...props }) {
  const Element = props.href ? Anchor : Butt;
  // props.filled
  // props.outlin
  const btnClass = cn({
    button: true,
    button_filled: filled,
    button_plus: plused
  });
  return <Element className={btnClass} {...props} />;
};
