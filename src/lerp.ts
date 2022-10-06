export function lerp(a: number, b: number, x = 0.5) {
    return a * (1 - x) + b * x
}

export function lerp_dt(f: number, dt: number, a: number, b: number) {
    return lerp(a, b, 1 - Math.pow(f, dt))
}

export function appr(a: number, b: number, by: number) {
    if (a < b) { return Math.min(a + by, b) }
      if (a > b) { return Math.max(a - by, b) }
        return b
}

/* https://gist.github.com/gre/1650294 */
export function ease(t: number) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
