# martin

Simple vanillaJS slider

## API

### inst = new Slider(el || selector, options)

**inst.setTo(index)**

`callback({ index })`

**inst.slideTo(index, direction)**

`callback({ index, direction })`

**inst.slidePrev()**

`callback({ index })`

**inst.slideNext()**

`callback({ index })`

**inst.on(event, callback)**

`event` is one of `set`, `slide`, `slidePrev`, `slideNext`

Action will be prevented if callback will return `false`

### Helpers

**inst.attr(name)**

Returns data-martin-* attribute value with related type

**inst.listen(event, callback)**

Listen system event on slider root-element

**inst.listen(selector, event, callback)**

Listen system event on slider children elements

## Core plugins

### Controls

**Options**

```js
{
  prev: prevClass,
  next: nextClass
}
```

**Root data-attributes**

`data-martin-prev="prevClass"`
`data-martin-next="nextClass"`

## Polyfills

- [element.classList](https://github.com/jwilsson/domtokenlist) (core)
