# martin

Simple vanillaJS slider

## API

`inst = new Slider(el || selector, options)`

`inst.setTo(index)`

`inst.slideTo(index, direction)`

`inst.slidePrev()`

`inst.slideNext()`

`inst.play(timeout)`

`inst.stop()`

## Core plugins

### Autoplay

**Options**

```js
{
  autoplay: timeout
}
```

**Root data-attributes**

`data-martin-autoplay="timeout"`

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
