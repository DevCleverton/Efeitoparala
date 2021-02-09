import React from "react";
import _ from "lodash";

export class FixedRatio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperWidth: props.eleRef.innerWidth,
      wrapperHeight: props.eleRef.innerHeight
    };
    this.debouncedUpdateSize = _.debounce(this.updateSize, 250, {
      maxWait: 250
    });
  }
  updateSize = (wrapperWidth, wrapperHeight) => {
    this.setState({ wrapperWidth, wrapperHeight });
  };
  resizeHandler = e => {
    // console.log(this.debouncedUpdateSize);
    this.debouncedUpdateSize(
      e.currentTarget.innerWidth,
      e.currentTarget.innerHeight
    );
  };
  componentDidMount() {
    const { eleRef } = this.props;
    if (eleRef.addEventListener) {
      eleRef.addEventListener("resize", this.resizeHandler);
    } else {
      eleRef.attachEvent("onresize", this.resizeHandler);
    }
  }
  componentWillUnmount() {
    const { eleRef } = this.props;
    if (eleRef.removeEventListener) {
      // IE9, Chrome, Safari, Opera
      eleRef.removeEventListener("resize", this.resizeHandler);
    } else {
      // IE 6/7/8
      eleRef.detachEvent("onresize", this.resizeHandler);
    }
  }
  render() {
    const { wrapperWidth, wrapperHeight } = this.state;
    const { widthRatio, heightRatio, eleRef, ...props } = this.props;
    const swap = wrapperHeight < (wrapperWidth / widthRatio) * heightRatio;
    let width = `${100}vw`;
    let height = `${(100 / widthRatio) * heightRatio}vw`;
    if (swap) {
      width = `${(widthRatio / heightRatio) * 100}vh`;
      height = `100vh`;
    }
    return <div style={{ width, height }} {...props} />;
  }
}

FixedRatio.defaultProps = {
  widthRatio: 1,
  heightRatio: 0.625,
  swap: false,
  eleRef: window
};
