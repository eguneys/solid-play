import { on, createEffect, createSignal, createMemo, mapArray } from 'solid-js'
import { Vec2 } from './vec2'
import { read, write, owrite } from './play'
import Mouse from './mouse'
import { loop } from './play'



export class DragDecay {
  static make = (drag: MouseDrag, orig: Vec2, target: any, no_start: boolean = false) => {
    return new DragDecay(drag, orig, target, no_start)
  }

  get drag_move() {
    return Vec2.make(...this.drag.move)
  }

  get move() {
    return this.drag_move.add(this.decay)
  }

  get translate() {
    return this.drag_move.sub(this.start)
  }

  get drop() {
    return this.drag.drop
  }


  constructor(readonly drag: MouseDrag,
              readonly orig: Vec2, 
              readonly target: any,
              readonly no_start: boolean) {
                this.start = Vec2.make(...(no_start ? drag.move : drag.start))
                this.decay = orig.sub(this.start)
              }
}

export function make_drag(hooks: DragHooks, $ref: HTMLElement) {

  let { 
    on_hover,
    on_up,
    on_click,
    find_inject_drag,
    on_drag_update,
    find_on_drag_start
  } = hooks



  let _drag_decay = createSignal()
  let m_drag_decay = createMemo(() => read(_drag_decay))

  let _update = createSignal([16, 16], { equals: false })
  let update = createMemo(() => read(_update))

  let _hover = createSignal(undefined, { equals: (a, b) => b?.equals && a?.equals(b) })

  let mouse = new Mouse($ref).init()

  loop((dt, dt0) => {

    mouse.update(dt, dt0)
    owrite(_update, [dt, dt0])

    let { click, hover, drag, up } = mouse

    if (click) {
      on_click(click)
    }

    if (hover) {
      owrite(_hover, Vec2.make(...hover))
    }

    if (up) {
      on_up()
    }


    if (drag && !!drag.move0) {
      if (!read(_drag_decay)) {
        let inject_drag = find_inject_drag()
        if (inject_drag) {
          owrite(_drag_decay, new DragDecay(drag, inject_drag.abs_pos, inject_drag))
        }
      }
    }

    if (drag && !drag.move0) {
      let vs = find_on_drag_start(drag)
      if (vs) {
        owrite(_drag_decay, new DragDecay(drag, vs, res))
      }
    }
  })

  createEffect(on(update, (dt, dt0) => {
    let decay = m_drag_decay()
    if (decay) {
      decay.target.lerp_vs(decay.move)
      on_drag_update(decay)
      if (decay.drop) {
        owrite(_drag_decay, undefined)
      }
    }
  }))

  createEffect(on(_hover[0], _ => _ && on_hover(_)))


  return {
    $clear_bounds() {
      mouse.$clear_bounds()
    },
    get decay() {
      return m_drag_decay()
    }
  }
}
