import { onCleanup } from 'solid-js'

function unbindable(
  el: EventTarget,
  eventName: string,
  callback: EventListener,
  options?: AddEventListenerOptions
): Unbind {
  el.addEventListener(eventName, callback, options);
  return () => el.removeEventListener(eventName, callback, options);
}

export const onScrollHandlers = (ctrl) => {
  let unbinds = [];

  unbinds.push(unbindable(document, 'scroll', () => ctrl.onScroll(), { capture: true, passive: true }));
  unbinds.push(unbindable(window, 'resize', () => ctrl.onScroll(), { passive: true }));

  onCleanup(() => unbinds.forEach(_ => _()));
}
