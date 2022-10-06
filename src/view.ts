import { onCleanup } from 'solid-js'
import { Ref } from './ref'

type Unbind = () => void
function unbindable(
  el: EventTarget,
  eventName: string,
  callback: EventListener,
  options?: AddEventListenerOptions
): Unbind {
  el.addEventListener(eventName, callback, options);
  return () => el.removeEventListener(eventName, callback, options);
}

export const onScrollHandlers = (ctrl: { onScroll: () => void }) => {
  let unbinds: Array<Unbind> = [];

  unbinds.push(unbindable(document, 'scroll', () => ctrl.onScroll(), { capture: true, passive: true }));
  unbinds.push(unbindable(window, 'resize', () => ctrl.onScroll(), { passive: true }));

  onCleanup(() => unbinds.forEach(_ => _()));
}

export const set_$ref = (ref: Ref) => (_: HTMLElement) => setTimeout(() => ref.$ref = _)
