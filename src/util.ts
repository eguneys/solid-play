import { createEffect } from 'solid-js'
import { Memo } from './types'

export const m_log = <A>(m: Memo<A>) => createEffect(() => console.log(m()))
