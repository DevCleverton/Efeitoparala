import React from "react";
import cn from "classnames";

const easeInOut = {
  Sine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  Quad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  Cubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  Quart: "cubic-bezier(0.77, 0, 0.175, 1)",
  Quint: "cubic-bezier(0.86, 0, 0.07, 1)",
  Expo: "cubic-bezier(1, 0, 0, 1)"
};
export class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0
    };
  }
  render() {
    const {
      backImage,
      frontImage,
      index,
      transitionDuration,
      easing,
      className
    } = this.props;
    const frontYs = [85, 48.5, 35.5];
    const backYs = [0, 42.5, 93.3];
    return (
      <div
        className={cn("parallax", className)}
        onClick={() => {
          this.setState({ i: this.state.i + 1 });
        }}
      >
        <div
          className="parallax-back"
          style={{
            backgroundImage: `url("${backImage}")`,
            backgroundPositionY: `${backYs[index]}%`,
            transition: `all ${transitionDuration}ms ${easeInOut[easing]}`
          }}
        />
        <div
          className="parallax-front"
          style={{
            backgroundImage: `url("${frontImage}")`,
            backgroundPositionY: `${frontYs[index]}%`,
            transition: `all ${transitionDuration}ms ${easeInOut[easing]}`
          }}
        />
      </div>
    );
  }
}

Parallax.defaultProps = {
  backImage: "./lines.png",
  frontImage: "./city.png",
  index: 0,
  duration: 1500,
  easing: "Cubic"
};
// 43%
// Parallax.defaultProps = {
//   backImage: "./city.png",
//   frontImage: "./lines.png"
// }; 30 18.6
