import { ResourceReturn, Signal, Setter } from 'solid-js'

export function mread<A>(resource: ResourceReturn<A>): A | undefined {
    return resource[0]()
}

export const write = <A>(_: Signal<A>, _f: (_: A) => void) => {
  return _[1](_ => { _f(_); return _ })
}


export const read = <A>(_: Signal<A>): A => {
  return _[0]()
}

export const owrite = <A>(_: Signal<A>, _f: Parameters<Setter<A>>[0]) => {
  if (typeof _f === 'function') {
    return _[1](_f)
  } else {
    return _[1](_ => _f as A)
  }
}
