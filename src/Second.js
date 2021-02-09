import React from "react";
import anime from "animejs";
import { Button } from "./button";
import { Col } from "./Col";

export class Second extends React.Component {
  constructor(props) {
    super(props);
  }
  imageWrapper = null;
  image = null;
  square = null;
  header = null;
  subheader = null;
  button = null;
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
    const thatImage = this.image;
    if (!prevProps.active && !active) {
      this.cancelCurrentAnimation();
    }
    if (prevProps.active && !active) {
      this.cancelCurrentAnimation();
      // out
      this.currentAnimation = anime
        .timeline()
        .add({
          targets: this.square,
          translateY: ["0%", "-100%"],
          opacity: [0.8, 0],
          offset: 0,
          duration: outDuration,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.imageWrapper,
          translateY: ["0%", "-25%"],
          opacity: [1, 0],
          offset: 0,
          duration: outDuration,
          easing: `easeIn${easing}`
        })
        .add({
          targets: [this.subheader, this.header, this.button, this.text],
          opacity: [1, 0],
          translateY: 0,
          offset: 0,
          duration: outDuration,
          easing: `easeIn${easing}`
        });
    }
    if (!prevProps.active && active) {
      this.cancelCurrentAnimation();
      // in
      // All in should have a 500ms delay
      this.currentAnimation = anime
        .timeline()
        .add({
          targets: this.imageWrapper,
          translateY: ["100%", "0%"],
          scaleY: ["0", "1"],
          opacity: [1, 1],
          offset: 0,
          delay: fixedDelay,
          update: function(a) {
            const scale = a.animations.reduce(
              (res, cur) =>
                cur.property === "scaleY" ? cur.currentValue : res,
              null
            );
            if (scale > 0) {
              thatImage.style.transform = `scaleY(${1 / scale})`;
            } else {
              thatImage.style.transform = `scaleY(0)`;
            }
          },
          duration: inDuration,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.square,
          opacity: ["0.8"],
          scaleY: ["0", "1"],
          delay: fixedDelay,
          offset: 0,
          duration: inDuration,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.header,
          opacity: ["0", "1"],
          translateY: ["150%", "0%"],
          delay: fixedDelay,
          offset: 0,
          duration: inDuration,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.subheader,
          opacity: ["0", "1"],
          translateY: ["500%", "0%"],
          delay: fixedDelay,
          offset: 0,
          duration: inDuration,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.text,
          opacity: ["0", "1"],
          translateY: ["150%", "0%"],
          delay: fixedDelay,
          offset: 0,
          duration: inDuration,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.button,
          opacity: ["0", "1"],
          translateY: ["300%", "0%"],
          delay: fixedDelay,
          offset: 0,
          duration: inDuration,
          easing: `easeOut${easing}`
        });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Col col={4} left={1} className="portrait_col">
          <div
            className="portrait"
            ref={r => {
              this.imageWrapper = r;
            }}
          >
            <img
              ref={r => {
                this.image = r;
              }}
              className="portrait_img"
              src="./vertical.jpeg"
            />
          </div>
        </Col>
        <Col col={6} left={1} className="content">
          <h4
            className="header"
            ref={r => {
              this.header = r;
            }}
          >
            Simply Multiply
          </h4>
          <h1
            className="subheader"
            style={{ color: "#f6d542" }}
            ref={r => {
              this.subheader = r;
            }}
          >
            Nullan iD Dolor ID Ni8h Ultrices
          </h1>
          <p
            ref={r => {
              this.text = r;
            }}
          >
            Aw at beetle and eat it before it gets away destroy house in 5
            seconds somehow manage to catch a bird but have no idea what to do
            next, so play with it until it dies of shock. Wow, you made it far.
          </p>
          <div
            className="buttons"
            ref={r => {
              this.button = r;
            }}
          >
            <Button plused style={{ color: "#51CECE", borderColor: "#51CECE" }}>
              Get Started
            </Button>
          </div>
        </Col>
        <div
          className="bluepaledot"
          ref={r => {
            this.square = r;
          }}
        />
      </React.Fragment>
    );
  }
}
