export function createValueElements() {
    const label = document.createElement('label')

    const span = createSpan({text: 'Value'})

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

    const toggleDescription = createSpan({text})
    const toggle = createSpan({classname: 'progress__switch'})
    const slider = createSpan({classname: 'progress__slider'})

    const input = document.createElement('input')
    input.type = 'checkbox'

    toggle.appendChild(input)
    toggle.appendChild(slider)

    label.append(toggle)
    label.append(toggleDescription)

    return {label, input}
}

function createSpan({text, classname}) {
    const span = document.createElement('span')
    if (text) span.textContent = text
    if (classname) span.classList.add(classname)
    return span
}