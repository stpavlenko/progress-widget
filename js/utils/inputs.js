export function createValueInput() {
    const valueInput = document.createElement("input")
    valueInput.type = 'number'
    valueInput.min = 0
    valueInput.max = 100
    return valueInput
}

export function createToggle() {
    const toggle = document.createElement('input')
    toggle.type = 'checkbox'
    return toggle
}