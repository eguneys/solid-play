export const loop_for = (duration: number, fn: (dt: number, i: number) => void) => {

  let _elapsed = 0
  return loop((dt) => {
    _elapsed += dt
    let i = Math.min(1, _elapsed / duration)
    fn(dt, i)
    if (i === 1) {
      return true
    }
    return false
  })
}



export const loop = (_fn: (dt: number) => boolean | void) => {

  let _cancel: number

  let _last_now = 0

  function step(_now: number) {

    let dt = _now - (_last_now || _now)
    _last_now = _now

    if (_fn(dt)) {
      return
    }
    dt = Math.max(Math.min(dt, 16), 4)
    _cancel = requestAnimationFrame(step)
  }

  _cancel = requestAnimationFrame(step)

  return () => {
    cancelAnimationFrame(_cancel)
  }
}
