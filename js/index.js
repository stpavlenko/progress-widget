import {createToggle, createValueInput} from "./utils/inputs.js";

export class ProgressWidget {
    constructor(id, {state = 'normal', value = 0}) {
        this.root = document.createElement('div')
        const container = document.getElementById(id)
        container.appendChild(this.root)
        this.state = state
        this.value = 0
    }

    render() {
        this.ring = document.createElement('div')
        this.ring.classList.add('progress__ring')
        this.root.appendChild(this.ring)

        this.valueInput = createValueInput()
        this.root.appendChild(this.valueInput)

        this.animationToggle = createToggle()
        this.root.appendChild(this.animationToggle)

        this.hideToggle = createToggle()
        this.root.appendChild(this.hideToggle)

        this.update()
        this.addListeners()
    }

    setState = (state) => {
        this.resetStateChanges()

        switch (state) {
            case 'normal':
                this.update()
                break
            case 'animated':
                this.ring.classList.add('progress__ring--animated')
                this.ring.style.background = ''
                this.valueInput.disabled = true
                this.animationToggle.checked = true
                break
            case 'hidden':
                this.root.style.display = 'none'
                this.hideToggle.checked = true
                break
            default:
                throw new Error('Unknown state')
        }

        this.state = state
    }

    resetStateChanges = () => {
        this.root.style.display = 'block'
        this.ring.classList.remove('progress__ring--animated')
        this.valueInput.disabled = false
        this.animationToggle.checked = false
        this.hideToggle.checked = false
    }

    addListeners() {
        this.valueInput.addEventListener('input', this.handleInput)
        this.animationToggle.addEventListener('change', this.handleAnimationToggle)
        this.hideToggle.addEventListener('change', this.handleHideToggle)
    }

    update = () => {
        this.ring.style.background = `
            radial-gradient(closest-side, white 80%, transparent 80%), 
            conic-gradient(blue ${this.value}%, #dbedf6 0)
        `
    }
    handleInput = (e) => {
        this.value = e.target.value
        this.update()
    }

    handleAnimationToggle = (e) => {
        if (e.target.checked) this.setState('animated')
        else this.setState('normal')
    }

    handleHideToggle = e => {
        if (e.target.checked) this.setState('hidden')

    }
}

window.widget = new ProgressWidget('progress-widget', {})
widget.render()

widget.setState('animated')
setTimeout(() => widget.setState('normal'), 2500)
