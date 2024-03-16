import {createToggleElements, createValueElements} from "./utils/inputs.js";
import {createRoot} from "./utils/elements.js";
import {isStateValid, isValueValid, toValidValue} from "./utils/validation.js";

export class ProgressWidget {
    #state
    #value
    #ring
    #root
    #valueInput
    #animationToggle
    #hideToggle

    constructor(id, {state = 'normal', value = 0}) {
        if (!isStateValid(state)) throw new Error('state is not valid')
        if (!isValueValid(value)) throw new Error('value is not valid')

        this.#root = createRoot()
        const container = document.getElementById(id)
        container.appendChild(this.#root)
        this.#render()
        this.setValue(value)
        this.setState(state)
    }

    #render() {
        this.#ring = document.createElement('div')
        this.#ring.classList.add('progress__ring')
        this.#root.appendChild(this.#ring)

        const form = document.createElement('form')

        const value = createValueElements()
        this.#valueInput = value.input
        form.appendChild(value.label)

        const animationElements = createToggleElements('Animation')
        this.#animationToggle = animationElements.input
        form.appendChild(animationElements.label)

        const hideElements = createToggleElements('Hide')
        this.#hideToggle = hideElements.input
        form.appendChild(hideElements.label)

        this.#root.appendChild(form)
        this.#addListeners()
    }

    setState = (state) => {
        switch (state) {
            case 'normal':
                this.#resetStateChanges()
                this.#update()
                break
            case 'animated':
                this.#resetStateChanges()
                this.#ring.classList.add('progress__ring--animated')
                this.#ring.style.background = ''
                this.#valueInput.disabled = true
                this.#animationToggle.checked = true
                this.#hideToggle.disabled = true
                break
            case 'hidden':
                this.#resetStateChanges()
                this.#ring.style.display = 'none'
                this.#valueInput.disabled = true
                this.#animationToggle.disabled = true
                this.#hideToggle.checked = true
                break
            default:
                throw new Error('Unknown state')
        }

        this.#state = state
    }

    setValue = (value) => {
        const validValue = toValidValue(value)
        this.#valueInput.value = validValue
        this.#value = validValue
        if (this.#state === 'normal') this.#update()
    }

    #resetStateChanges = () => {
        this.#ring.style.display = 'block'
        this.#ring.classList.remove('progress__ring--animated')

        this.#valueInput.disabled = false
        this.#animationToggle.disabled = false
        this.#hideToggle.disabled = false

        this.#animationToggle.checked = false
        this.#hideToggle.checked = false
    }

    #addListeners() {
        this.#valueInput.addEventListener('input', this.#handleInput)
        this.#animationToggle.addEventListener('change', this.#handleAnimationToggle)
        this.#hideToggle.addEventListener('change', this.#handleHideToggle)
    }

    #update = () => {
        this.#ring.style.background = `
            radial-gradient(closest-side, white 80%, transparent 80%), 
            conic-gradient(#2196F3 ${this.#value || 0}%, #ccc 0)
        `
    }
    #handleInput = (e) => {
        this.setValue(e.target.value)
    }

    #handleAnimationToggle = (e) => {
        if (e.target.checked) this.setState('animated')
        else this.setState('normal')
    }

    #handleHideToggle = e => {
        if (e.target.checked) this.setState('hidden')
        else this.setState('normal')
    }
}

window.widget = new ProgressWidget('progress-widget',
    {
        state: 'normal',
        value: 62
    })

widget.setValue(50)
