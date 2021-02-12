import { Delay } from '@dcl/ecs-scene-utils'

export default function delay(ms: number): Promise<undefined> {
  return new Promise((resolve, reject) => {
    const ent = new Entity()
    engine.addEntity(ent)
    ent.addComponent(
      new Delay(ms, () => {
        resolve()
        engine.removeEntity(ent)
      })
    )
  })
}
