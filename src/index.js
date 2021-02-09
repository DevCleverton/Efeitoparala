// Design made by: https://dribbble.com/shots/4647577-Multiply-Parallax-Effect
import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { Slider } from "src/Slider";
import { Parallax } from "src/Parallax.js";
import { FixedRatio } from "src/FixedRatio.js";
import "src/reset.css";
import "src/styles.css";

const rootElement = document.getElementById("root");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      easing: "Cubic",
      width: window.innerWidth,
      height: window.innerHeight,
      transitionDuration: 1500
    };
    this.debouncedUpdateIndex = _.debounce(this.updateIndex, 200, {
      maxWait: 200
    });
  }
  updateIndex = increment => {
    let next = this.state.index + increment;
    if (next >= 3) {
      next = 0;
    } else if (next < 0) {
      next = 2;
    }
    this.setState({ index: next });
  };
  mouseWheelHandler = e => {
    // cross-browser wheel delta
    e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    this.debouncedUpdateIndex(-delta);

    return false;
  };
  componentDidMount() {
    if (rootElement.addEventListener) {
      // IE9, Chrome, Safari, Opera
      rootElement.addEventListener("mousewheel", this.mouseWheelHandler, false);
      // Firefox
      rootElement.addEventListener(
        "DOMMouseScroll",
        this.mouseWheelHandler,
        false
      );
    }
    // IE 6/7/8
    else {
      rootElement.attachEvent("onmousewheel", this.mouseWheelHandler);
    }
  }
  componentWillUnmount() {
    if (rootElement.addEventListener) {
      // IE9, Chrome, Safari, Opera
      rootElement.removeEventListener(
        "mousewheel",
        this.mouseWheelHandler,
        false
      );
      // Firefox
      rootElement.removeEventListener(
        "DOMMouseScroll",
        this.mouseWheelHandler,
        false
      );
    }
    // IE 6/7/8
    else {
      rootElement.detachEvent("onmousewheel", this.mouseWheelHandler);
    }
  }
  render() {
    const { index, easing, transitionDuration } = this.state;
    return [
      <Parallax
        className=" blurred"
        index={index}
        easing={easing}
        transitionDuration={transitionDuration}
      />,
      <FixedRatio
        className="fixedRatio"
        onClick={() => {
          this.updateIndex(1);
        }}
      >
        <Parallax
          index={index}
          easing={easing}
          transitionDuration={transitionDuration}
        />
        <Slider
          index={index}
          easing={easing}
          transitionDuration={transitionDuration}
        />
      </FixedRatio>,
      <div class="creators_wrapper">
        <div className="creator code">
          <h5 className="creator_title">Code</h5>
          <a
            className="creator_link"
            href="https://codesandbox.io/u/Anemolo"
            target="_new"
          >
            Daniel Velasquez
          </a>
        </div>
        <div className="creator design">
          <h5 className="creator_title">Design</h5>
          <a
            className="creator_link"
            href="https://dribbble.com/shots/4647577-Multiply-Parallax-Effect"
            target="_blank"
          >
            Eddie Lobanovskiy
          </a>
        </div>
      </div>
    ];
  }
}
// Design by Eddie
// Coded with <3 by Daniel
ReactDOM.render(<App />, rootElement);
