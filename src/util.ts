import { createEffect } from 'solid-js'

export const m_log = m => createEffect(() => console.log(m()))
