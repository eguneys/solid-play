import { Signal, Setter } from 'solid-js'





export const read = <A>(_: Signal<A>): A => {
  return _[0]()
}

export const owrite = <A>(_: Signal<A>, _f: Parameters<Setter<A>>[0]) => {
  if (typeof _f === 'function') {
    _[1](_f)
  } else {
    _[1](_ => _f as A)
  }
}
