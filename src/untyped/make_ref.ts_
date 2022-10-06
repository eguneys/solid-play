import { createSignal, createMemo } from 'solid-js'
import { Vec2 } from './vec2'
import { read, write, owrite } from './play'

export function make_ref() {

  let _$ref = createSignal()

  let _$clear_bounds = createSignal(undefined, { equals: false })

  let _top = createMemo(() => {
    read(_$clear_bounds)
    return read(_$ref)?.scrollTop
  })

  let m_top = createMemo(() => {
    let top = read(_top)

    if (top !== undefined) {
      return Vec2.make(0, top)
    }
  })

  let m_rect = createMemo(() => {
    read(_$clear_bounds)
    return read(_$ref)?.getBoundingClientRect()
  })

  let m_orig = createMemo(() => {
    let rect = m_rect()
    if (rect) {
      return Vec2.make(rect.x, rect.y)
    }
  })

  let m_size = createMemo(() => {
    let rect = m_rect()
    if (rect) {
      return Vec2.make(rect.width, rect.height)
    }
  })

  return {
    $clear_bounds() {
      owrite(_$clear_bounds)
    },
    get $ref() {
      return read(_$ref)
    },
    set $ref($ref: HTMLElement) {
      owrite(_$ref, $ref)
    },
    get rect() {
      return m_rect()
    },
    get orig() {
      return m_orig()
    },
    get size() {
      return m_size()
    },
    get_normal_at_abs_pos(vs: Vec2) {
        let size = m_size(),
        orig = m_orig()

      if (!!size &&  !!orig) {
        return vs.sub(orig).div(size)
      }
    }
  }

}

