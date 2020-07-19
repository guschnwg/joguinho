import Matter, { Engine } from "matter-js";
import { MatterCollisionEvents } from "matter-collision-events";

Matter.use(MatterCollisionEvents);

export const engine = Engine.create();

Engine.run(engine);
