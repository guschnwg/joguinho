import { World, Bodies } from "matter-js";

import { engine } from "./engine";
import { WIDTH, HEIGHT } from "./constants";

const size = 10;

World.add(engine.world, [
  Bodies.rectangle(WIDTH / 2, size / 2, WIDTH, size, {
    isStatic: true
  }),
  Bodies.rectangle(WIDTH / 2, HEIGHT - size / 2, WIDTH, size, {
    isStatic: true,
    isGround: true
  }),
  Bodies.rectangle(size / 2, HEIGHT / 2, size, HEIGHT, {
    isStatic: true
  }),
  Bodies.rectangle(WIDTH - size / 2, HEIGHT / 2, size, HEIGHT, {
    isStatic: true,
    inertia: Infinity
  }),

  Bodies.rectangle(340, HEIGHT - 550, 700, 20, {
    isStatic: true,
    isGround: true,
    angle: Math.PI * 0.06
  }),

  Bodies.rectangle(600, HEIGHT - 350, 700, 20, {
    isStatic: true,
    isGround: true,
    angle: -Math.PI * 0.1
  }),

  Bodies.rectangle(340, HEIGHT - 150, 700, 20, {
    isStatic: true,
    isGround: true,
    angle: Math.PI * 0.06
  })
]);
