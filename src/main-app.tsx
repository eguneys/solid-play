import { on, onCleanup, createSignal, createMemo, createEffect } from 'solid-js'
import { set_$ref } from './view'
import { Ref } from './ref'
import { Mouse } from './mouse'
import { make_drag_from_ref, Hooks } from './drag'

const App = () => {

  let drag_ref = Ref.make,
    drop_ref = Ref.make 

  let hooks: Hooks = {
     on_context() {
       console.log('here')
     },
     on_hover(e) {
      // console.log(drag_ref.get_normal_at_abs_pos(e))
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
   }

  make_drag_from_ref(hooks, drag_ref)

/*
  createEffect(on(() => drag_ref.$ref, ($_) => {
    if ($_) {

      onCleanup(make_drag(hooks, $_))
    }
  }))
*/

  return (<>
    <div class='solid-play'>
    <div ref={set_$ref(drag_ref)} class='drag-me'>
      <div> Drag Area </div>
      <div> Drag Area </div>
      <div> Drag Area </div>
      <div> Drag Area </div>
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
