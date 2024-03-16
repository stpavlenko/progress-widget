export const isStateValid = (state) =>
    state === 'normal' ||
    state === 'hidden' ||
    state === 'animated'

export const isValueValid = (value) => value >= 0 && value <= 100

export const toValidValue = (value) => {
    if (isNaN(value)) throw new Error('value must be number')
    if (value > 100) return 100
    else if (value < 0) return 0
    else return value
}