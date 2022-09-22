import { on, onCleanup, createEffect } from 'solid-js'
import { Mouse } from './mouse'
import { loop } from './play'


export const make_drag = (hooks: Hooks, $_: HTMLElement) => {

  let { 
    on_hover,
    on_up,
    on_click,
    on_drag,
    on_context
  } = hooks

  let _drag
  let _m
  let _cancel_raf

  return Mouse.init({
    ...(on_context ?  {
      _onContextMenu() {
        on_context()
      }
    }: {}),
    _onDragStart(e) {

      _drag = { e }

      _cancel_raf = loop((dt: number, dt0: number) => {
        if (_drag.m || _drag.e.distance(_m) > 3) { _drag.m = _m }
        on_drag?.(_drag)
      })
    },
    _onDragMove(e) { 
      _m = e
      if (!_drag) {
        on_hover?.(e)
      }
    },
    _onDragEnd() { 
      if (!_drag.m) {
        on_click?.(_drag.e) 
      }
      on_up?.(_drag.e)
      _cancel_raf?.() 
    }
  }, $_)
}
