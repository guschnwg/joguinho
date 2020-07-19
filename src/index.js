import { Render } from "matter-js";

import "./styles.css";

import { engine } from "./engine";
import { WIDTH, HEIGHT } from "./constants";
import "./player";
import "./walls";

const DEBUGGING = false;

export const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    height: HEIGHT,
    width: WIDTH,
    pixelRatio: 1,
    background: "#222",
    wireframeBackground: "#222",
    enabled: true,
    wireframes: DEBUGGING,
    showVelocity: DEBUGGING,
    showAngleIndicator: DEBUGGING,
    showCollisions: DEBUGGING,
    showBroadphase: DEBUGGING
  }
});

Render.run(render);
