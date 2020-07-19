import { Bodies, World, Events, Body } from "matter-js";

import { engine } from "./engine";
import { HEIGHT } from "./constants";

const PLAYER_X = 100;
const PLAYER_Y = HEIGHT - 100;
const PLAYER_WIDTH = 25;
const PLAYER_HEIGHT = 50;
const PLAYER_DENSITY = 0.04;
const PLAYER_VELOCITY = PLAYER_DENSITY * 4;
const PLAYER_JUMP_STRENGTH = PLAYER_DENSITY * 50;

const PLAYER_TEXTURE = {
  Idle: (index) => `./assets/cat/Idle (1).png`,
  Walk: (index) => `./assets/cat/Walk (${(index % 10) + 1}).png`,
  Run: (index) => `./assets/cat/Run (${(index % 8) + 1}).png`,
  Jump: (index) => `./assets/cat/Jump (4).png`
};

const groundChecker = Bodies.rectangle(PLAYER_X, PLAYER_Y + 26, 21, 1, {
  isSensor: true,
  isStatic: true,
  label: "Ground Checker",
  render: {
    fillStyle: "purple"
  },
  isActive: false
});
const rightWallChecker = Bodies.rectangle(
  PLAYER_X - PLAYER_WIDTH / 2 - 1,
  PLAYER_Y,
  1,
  48,
  {
    isSensor: true,
    isStatic: true,
    label: "Ground Checker",
    render: {
      fillStyle: "purple"
    },
    isActive: false
  }
);
const leftWallChecker = Bodies.rectangle(
  PLAYER_X + PLAYER_WIDTH / 2 + 1,
  PLAYER_Y,
  1,
  48,
  {
    isSensor: true,
    isStatic: true,
    label: "Ground Checker",
    render: {
      fillStyle: "purple"
    },
    isActive: false
  }
);
const wallCheckers = [groundChecker, leftWallChecker, rightWallChecker];

const body = Bodies.rectangle(PLAYER_X, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT, {
  label: "Player Body",
  inertia: Infinity,
  inverseInertia: 1 / Infinity,
  density: PLAYER_DENSITY,
  runSpeed: PLAYER_VELOCITY,
  walkSpeed: PLAYER_VELOCITY, // 2,
  jumpForce: PLAYER_JUMP_STRENGTH,
  status: "Idle",
  render: {
    sprite: {
      yScale: 0.1,
      xScale: 0.1,
      flip: false,
      texture: PLAYER_TEXTURE.Idle(1),
      textureIndex: 1
    },
    strokeStyle: "red",
    lineWidth: 1
  }
});

const player = Body.create({
  parts: [...wallCheckers, body]
});

World.add(engine.world, player);

const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  if (keys.ArrowUp || keys.Space) {
    if (groundChecker.isActive) {
      Body.applyForce(player, player.position, { x: 0, y: -body.jumpForce });
    } else if (rightWallChecker.isActive || leftWallChecker.isActive) {
      Body.applyForce(player, player.position, {
        x: (body.jumpForce / 4) * leftWallChecker.isActive ? -1 : 1,
        y: -body.jumpForce / 2
      });
      body.render.sprite.flip = !body.render.sprite.flip;
    }
  }
});
document.addEventListener("keyup", (e) => (keys[e.code] = false));

Events.on(engine, "beforeTick", () => {
  if (groundChecker.isActive) {
    player.friction = 0.15;

    if (keys.ArrowLeft && player.velocity.x > -15) {
      Body.applyForce(player, player.position, {
        x: keys.ShiftLeft ? -body.runSpeed : -body.walkSpeed,
        y: 0
      });
      body.status = keys.ShiftLeft ? "Run" : "Walk";
    }
    if (keys.ArrowRight && player.velocity.x < 15) {
      Body.applyForce(player, player.position, {
        x: keys.ShiftLeft ? body.runSpeed : body.walkSpeed,
        y: 0
      });
      body.status = keys.ShiftLeft ? "Run" : "Walk";
    }
  } else {
    player.friction = 0;
  }

  body.render.sprite.flip = player.velocity.x < 0;

  body.render.sprite.texture = PLAYER_TEXTURE[body.status](
    1 + body.render.sprite.textureIndex++
  );
});

[rightWallChecker, leftWallChecker].forEach((collider) => {
  collider.onCollide(() => (collider.isActive = true));
  collider.onCollideActive(() => (collider.isActive = true));
  collider.onCollideEnd(() => (collider.isActive = false));
});

groundChecker.onCollide(() => {
  groundChecker.isActive = true;
  body.status = "Idle";
});
groundChecker.onCollideActive(() => {
  groundChecker.isActive = true;
  console.log(player.velocity.x);
  if (player.velocity.x < -0.15 || player.velocity.x > 0.15) {
    body.status = "Walk";
  } else {
    body.status = "Idle";
  }
});
groundChecker.onCollideEnd(() => {
  groundChecker.isActive = false;
  body.status = "Jump";
});
