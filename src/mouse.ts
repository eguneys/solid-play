import { Vec2 } from './vec2'

export function eventPosition(e: MouchEvent): [number, number] | undefined {
  if (e.clientX !== undefined && e.clientY !== undefined) {
    return [e.clientX, e.clientY]
  }
  if (e.targetTouches?.[0]) {
    return [e.targetTouches[0].clientX, e.targetTouches[0].clientY]
  }
}

export class Mouse {

  static init = (hs: MouseHooks, $_: HTMLElement = document) => {

    const ep = _ => Vec2.make(...eventPosition(_)||Vec2.zero)

    let { _onDragStart, _onDragMove, _onDragEnd, _onContextMenu, _onWheel } = hs

    const dragStart = e => { _onDragStart?.(ep(e), e.buttons === 2 || e.button === 2) }
    const dragMove = e => { _onDragMove?.(ep(e)) }
    const dragEnd = e => { _onDragEnd?.(ep(e)) }
    const contextMenu = e => { 
      if (_onContextMenu) {
        e.preventDefault() 
        _onContextMenu() 
      }
    }
    const onWheel = e => { _onWheel?.(Math.sign(ev.deltaY)) }

    $_.addEventListener('wheel', onWheel)

    $_.addEventListener('mousedown', dragStart) 
    $_.addEventListener('contextmenu', contextMenu)

    document.addEventListener('mousemove', dragMove)
    document.addEventListener('mouseup', dragEnd)

    return () => {
      $_.removeEventListener('wheel', onWheel) 
      $_.removeEventListener('mousedown', dragStart)
      $_.removeEventListener('contextmenu', contextMenu)

      document.removeEventListener('mousemove', dragMove)
      document.removeEventListener('mouseup', dragEnd)
    }
  }
}
