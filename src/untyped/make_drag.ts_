import { on, onCleanup, createEffect } from 'solid-js'
import { Mouse } from './mouse'
import { loop } from './play'


export const make_drag_ref = (hooks: Hooks, ref: Ref) => {
  createEffect(on(() => ref.$ref, ($_) => {
    if ($_) {
      onCleanup(make_drag(hooks, $_))
    }
  }))
}


export const make_drag = (hooks: Hooks, $_: HTMLElement) => {

  let { 
    on_hover,
    on_up,
    on_click,
    on_drag,
    on_context
  } = hooks

  let _drag
  let _drag0
  let _m
  let _cancel_raf

  const clone_drag = (_) => {
    return _ && { ..._ }
  }

  return Mouse.init({
    ...(on_context ?  {
      _onContextMenu() {
        on_context()
      }
    }: {}),
    _onDragStart(e, _right) {

      _drag0 = clone_drag(_drag)
      _drag = { e, _right }
      if (_cancel_raf) {
        _cancel_raf?.() 
      }

      _cancel_raf = loop((dt: number, dt0: number) => {
        if (_drag.m || _drag.e.distance(_m) > 3) { _drag.m = _m; }

        on_drag?.(_drag, _drag0)

        _drag0 = clone_drag(_drag)
      })
    },
    _onDragMove(e) { 
      _m = e
      if (!_drag) {
        on_hover?.(e)
      }
    },
    _onDragEnd() { 
      if (!_drag) {
        return
      }
      if (!_drag.m) {
        on_click?.(_drag.e, _drag._right) 
      }
      on_up?.(_drag.m || _drag.e, _drag._right)
      _cancel_raf?.() 
      _cancel_raf = undefined
      _drag = undefined
    }
  }, $_)
}
