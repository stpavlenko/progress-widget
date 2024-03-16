export function createValueElements() {
    const label = document.createElement('label')

    const span = createSpan('Value')

    const input = document.createElement("input")
    input.type = 'number'
    input.min = 0
    input.max = 100

    label.append(input)
    label.append(span)

    return {label, input}
}

export function createToggleElements(text) {
    const label = document.createElement('label')

    const span = createSpan(text)

    const toggle = document.createElement('span')
    toggle.classList.add('progress__switch')

    const slider = document.createElement('span')
    slider.classList.add('progress__slider')

    const input = document.createElement('input')
    input.type = 'checkbox'

    toggle.appendChild(input)
    toggle.appendChild(slider)

    label.append(toggle)
    label.append(span)

    return {label, input}
}

function createSpan(text) {
    const span = document.createElement('span')
    span.textContent = text
    return span
}