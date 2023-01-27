import { Vec2 } from './vec2'

export type Role = 'r' | 'k' | 'q' | 'b' | 'n' | 'p' | 'd'
export type Color = 'w' | 'b'
export type Pos = string

export const initial_fen = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`

export const files = 'abcdefgh'.split('')

export const ranks = '87654321'.split('')
export const ranks_reversed = ranks.slice(0).reverse()


export const colors = 'wb'.split('')
export const roles = 'rkqbnp'.split('')

export const role_long = { r: 'rook', k: 'king', q: 'queen', b: 'bishop', n: 'knight', p: 'pawn' }
export const color_long = { w: 'white', b: 'black' }
export const long_color = color_long
export const long_role = role_long

export const pieces = colors.flatMap(c => roles.map(r => `${c}${r}`))
export const poss = files.flatMap(f => ranks.map(r => `${f}${r}`))

export const vec2_poss = (v: Vec2) => {
  let f = files[v.x],
    r = ranks[v.y]
  return f && r && `${f}${r}`
}

export const poss_vec2 = new Map(poss.map(_ => {
  let [file, rank] = _.split('')
  let x = files.indexOf(file),
    y = ranks.indexOf(rank)
  return [_, Vec2.make(x, y)]
}))



export const dark_pos = (pos: Pos) => { 
  let _ = poss_vec2.get(pos)!
  return (_.x + _.y) % 2 === 0
}
export const light_pos = (_: Pos) => !dark_pos(_)

export const dark_poss = poss.filter(dark_pos)
export const light_poss = poss.filter(light_pos)

export const vec2_orientation = (v: Vec2, o: Color) => {
  if (o === 'b') {
    return Vec2.make(v.x, 7 - v.y)
  }
  return v
}



