import { Signal } from 'solid-js'
import { createSignal } from 'solid-js'
import { read, owrite } from './play'

export class Ref {

  get $ref() {
    return read(this._$ref)
  }

  set $ref($ref: HTMLElement) {
    owrite(this._$ref, $ref)
  }

  _$ref: Signal<HTMLElement | undefined>

  constructor() {
    this._$ref = createSignal()
  }

}
