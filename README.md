# Progress widget

Widget for display progress

## Example of use

```
widget = new ProgressWidget('progress-widget',
    {
        state: 'normal', 
        value: 62
    }
)
```

### Params:

First - id of DOM element, where the widget will be embedded

State:

- normal
- hidden
- animated

Value in the range of 100

## API

`widget.setState()` - set state of widget
`widget.setValue()` - set value of widget

