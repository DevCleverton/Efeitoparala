import React from "react";
import { Button } from "./button";
import { Col } from "./Col";
import anime from "animejs";

const dur = 900;
export class Third extends React.Component {
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
          targets: this.header,
          opacity: [1, 0],
          translateY: ["0%", "150%"],
          duration: outDuration,
          offset: 0,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.subheader,
          opacity: [1, 0],
          translateY: ["0%", "500%"],
          duration: outDuration,
          offset: 0,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.text,
          opacity: [1, 0],
          translateY: ["0%", "150%"],
          duration: outDuration,
          offset: 0,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.button,
          opacity: [1, 0],
          translateY: ["0%", "300%"],
          duration: outDuration,
          offset: 0,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.square,
          scaleY: ["1", "0"],
          translateY: [0, 0],
          duration: outDuration,
          offset: 0,
          easing: `easeIn${easing}`
        })
        .add({
          targets: this.imageWrapper,
          scaleY: ["1", "0"],
          translateY: ["0%", "50%"],
          duration: outDuration,
          offset: 0,
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
          easing: `easeIn${easing}`
        });
    }
    if (!prevProps.active && active) {
      this.cancelCurrentAnimation();
      // out
      // in
      // All in should have a 500ms delay
      this.currentAnimation = anime
        .timeline()
        .add({
          targets: this.header,
          opacity: [0, 1],
          translateY: ["150%", "0%"],
          duration: inDuration,
          offset: fixedDelay,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.subheader,
          opacity: [0, 1],
          translateY: ["500%", "0%"],
          duration: inDuration,
          offset: fixedDelay,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.text,
          opacity: [0, 1],
          translateY: ["150%", "0%"],
          duration: inDuration,
          offset: fixedDelay,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.button,
          opacity: [0, 1],
          translateY: ["300%", "0%"],
          duration: inDuration,
          offset: fixedDelay,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.square,
          scaleY: ["0", "1"],
          translateY: [0, 0],
          delay: inDuration,
          offset: 0,
          duration: fixedDelay,
          easing: `easeOut${easing}`
        })
        .add({
          targets: this.imageWrapper,
          scaleY: ["0", "1"],
          offset: 0,
          translateY: ["50%", "0%"],
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
          delay: inDuration,
          duration: fixedDelay,
          easing: `easeOut${easing}`
        });
      // anime({
      //   targets: this.image,
      //   scaleY: ["0", "1"],
      //   translateY: ["25%", "0%"],
      //   opacity: [1, 1],
      //   delay: inDuration,
      //   duration: fixedDelay,
      //   easing: `easeOut${easing}`
      // });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Col col={4} left={1} className="content">
          <h4
            className="header"
            ref={r => {
              this.header = r;
            }}
          >
            Shifting Layers
          </h4>
          <h1
            className="subheader"
            ref={r => {
              this.subheader = r;
            }}
            style={{ color: "#BBED44" }}
          >
            Nullan iD Dolor ID Ni8h Ultrices
          </h1>
          <p
            ref={r => {
              this.text = r;
            }}
          >
            Eat from dog's food unwrap toilet paper so cats secretly make all
            the worlds muffins or jump five feet. Eat from dog's food unwrap.
          </p>
          <div
            className="buttons"
            ref={r => {
              this.button = r;
            }}
          >
            <Button plused style={{ color: "#FF5413", borderColor: "#FF5413" }}>
              Get Started
            </Button>
          </div>
        </Col>
        <Col col={7} className="landscape-col">
          <div
            className="landscape"
            ref={r => {
              this.imageWrapper = r;
            }}
          >
            <img
              className="landscape_img"
              src="./rose.jpeg"
              ref={r => {
                this.image = r;
              }}
            />
          </div>
        </Col>
        <div
          className="yellowbrightsun"
          ref={r => {
            this.square = r;
          }}
        />
      </React.Fragment>
    );
  }
}
