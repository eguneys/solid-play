import { on, onCleanup, createEffect } from 'solid-js'
import { Mouse } from './mouse'
import { Ref } from './ref'

export type WHooks = {
  on_wheel: (d: number) => void
}

export const make_wheel_from_ref = (hooks: WHooks, ref: Ref) => {
  createEffect(on(() => ref.$ref, ($_) => {
    if ($_) {
      onCleanup(make_wheel(hooks, $_))
    }
  }))
}


export const make_wheel = (hooks: WHooks, $_: HTMLElement) => {

  let { 
    on_wheel
  } = hooks
 
  return Mouse.init({
    _onWheel(_) { on_wheel(_) }
  })
}
