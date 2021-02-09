import React from "react";
import cn from "classnames";
import { Button } from "./button";
import { Col } from "./Col";
import { First } from "./First";
import { Second } from "./Second";
import { Third } from "./Third";

const Slide = function(props) {
  return <div className={cn("slide", props.className)}>{props.children}</div>;
};
export class Slider extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { index, transitionDuration, easing } = this.props;

    // In comes after out so we add it to the delay
    const outDuration = transitionDuration * 0.35;
    const inDelay = transitionDuration * 0.05;
    const inDuration = transitionDuration * 0.6;
    const transitionProps = {
      duration: transitionDuration,
      easing,
      inDelay,
      outDuration,
      inDuration
    };

    return (
      <div
        className="slider"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        <Slide className="first">
          <First active={index === 0} {...transitionProps} />
        </Slide>
        <Slide className="second">
          <Second active={index === 1} {...transitionProps} />
        </Slide>
        <Slide className="third">
          <Third active={index === 2} {...transitionProps} />
        </Slide>
      </div>
    );
  }
}
