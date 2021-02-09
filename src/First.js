import React from "react";
import anime from "animejs";
import cn from "classnames";
import { Button } from "./button";
import { Col } from "./Col";

export class First extends React.Component {
  constructor(props) {
    super(props);
    this.colRef = null;
  }
  currentAnimation = null;
  cancelCurrentAnimation = () => {
    if (this.currentAnimation) {
      this.currentAnimation.pause();
      this.currentAnimation = null;
    }
  };
  componentDidUpdate(prevProps) {
    const {
      active,
      duration,
      easing,
      outDuration,
      inDelay,
      inDuration
    } = this.props;

    // In comes after out so we add it to the delay
    const fixedDelay = outDuration + inDelay;
    if (!prevProps.active && !active) {
      this.cancelCurrentAnimation();
    }

    if (prevProps.active && !active) {
      this.cancelCurrentAnimation();
      // out
      this.currentAnimation = anime({
        targets: this.colRef,
        translateY: ["0%", "-100%"],
        opacity: [1, 0],
        duration: outDuration,
        easing: `easeIn${easing}`
      });
    }
    if (!prevProps.active && active) {
      this.cancelCurrentAnimation();
      // in
      this.currentAnimation = anime({
        targets: this.colRef,
        translateY: ["-100%", "0%"],
        opacity: { value: [0, 1], easing: `easeOut${easing}` },
        delay: fixedDelay,
        duration: inDuration,
        easing: `easeOut${easing}`
      });
    }
  }
  render() {
    console.log(this.colRef, "render");
    return (
      <Col
        left={1}
        col={8}
        className="content"
        innerRef={r => {
          this.colRef = r;
        }}
      >
        <h4 className="display-2">Experimantal</h4>
        <h1 className="display-1">Parallax Effect</h1>
        <div className="buttons">
          <Button
            filled
            style={{ backgroundColor: "#f6d542", borderColor: "#f6d542" }}
          >
            +
          </Button>
          <Button style={{ color: "#51CECE", borderColor: "#51CECE" }}>
            Lets do this
          </Button>
        </div>
      </Col>
    );
  }
}
