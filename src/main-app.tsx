import { on, onCleanup, createSignal, createMemo, createEffect } from 'solid-js'
import { set_$ref } from './view'
import { make_ref } from './make_ref'
import { Mouse } from './mouse'
import { make_drag } from './make_drag'

const App = () => {

  let drag_ref = make_ref(),
    drop_ref = make_ref()

  createEffect(on(() => drag_ref.$ref, ($_) => {
    if ($_) {

      onCleanup(make_drag({
        on_context() {
          console.log('here')
        },
        on_hover(e) {
          console.log(drag_ref.get_normal_at_abs_pos(e))
        },
        on_drag(e) {
          console.log('drag', e)
        },
        on_click(e) {
          console.log('click')
        },
        on_up(e) {
          console.log('up', e)
        }
      }, $_))
    }
  }))

  return (<>
    <div class='solid-play'>
    <div ref={set_$ref(drag_ref)} class='drag-me'>
      Drag Area
    </div>

    <div class="c-wrap">
      <p> Pre render text </p>
      <div ref={set_$ref(drop_ref)} class="drop-area">
        Drop Area
      </div>
    </div>
    </div>
      </>)
}



export default App
