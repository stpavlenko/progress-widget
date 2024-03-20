import {createToggleElements, createValueElements} from "./utils/createInputs.js";
import {createProgressWidget} from "./utils/createProgressWidget.js";
import {clampValue, isStateValid, isValueValid, toValidValue} from "./utils/validation.js";

export class ProgressWidget {
    #state
    #value
    #ring
    #progressWidget
    #valueInput
    #animationToggle
    #hideToggle

    constructor(id, {state = 'normal', value = 0}) {
        if (!isStateValid(state)) throw new Error('state is not valid')
        if (!isValueValid(value)) throw new Error('value is not valid')

        this.#progressWidget = createProgressWidget()
        const widgetContainer = document.getElementById(id)
        widgetContainer.appendChild(this.#progressWidget)
        this.#render()
        this.setValue(value)
        this.setState(state)
    }

    #render() {
        this.#ring = document.createElement('div')
        this.#ring.classList.add('progress__ring')
        this.#progressWidget.appendChild(this.#ring)

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

        this.#progressWidget.appendChild(form)
        this.#addListeners()
    }

    setState = (state) => {
        switch (state) {
            case 'normal':
                this.#setNormalState()
                break
            case 'animated':
                this.#setAnimatedState()
                break
            case 'hidden':
                this.#setHiddenState()
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

    #setNormalState = () => {
        this.#resetStateChanges()
        this.#update()
    }

    #setAnimatedState = () => {
        this.#resetStateChanges()
        this.#update(clampValue(this.#value))
        this.#ring.classList.add('progress__ring--animated')
        this.#valueInput.disabled = true
        this.#hideToggle.disabled = true
        this.#animationToggle.checked = true
    }

    #setHiddenState = () => {
        this.#resetStateChanges()
        this.#ring.style.display = 'none'
        this.#valueInput.disabled = true
        this.#animationToggle.disabled = true
        this.#hideToggle.checked = true
    }

    #addListeners() {
        this.#valueInput.addEventListener('input', this.#handleInput)
        this.#animationToggle.addEventListener('change', this.#handleAnimationToggle)
        this.#hideToggle.addEventListener('change', this.#handleHideToggle)
    }

    #update = (value = this.#value) => {
        this.#ring.style.background = `
            radial-gradient(closest-side, white 80%, transparent 80%), 
            conic-gradient(#2196F3 ${value || 0}%, #ccc 0)
        `
    }
    #handleInput = (e) => {
        this.setValue(e.target.value)
    }

    #handleAnimationToggle = (e) => {
        this.setState(e.target.checked ? 'animated' : 'normal');
    }

    #handleHideToggle = e => {
        this.setState(e.target.checked ? 'hidden' : 'normal');
    }
}

window.widget = new ProgressWidget('progress-widget',
    {
        state: 'normal',
        value: 45
    })
