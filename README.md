# martin

Extendable vanillaJS slider

## Usage

```html
<!-- .martin-slideshow will be initialized on document ready -->
<section class="martin-slideshow">
	<!-- Height based on first slide -->
	<!-- First slide is active by default -->
	<article class="martin-slide"></article>
	<!-- Active class recommended to prevent flashing -->
	<article class="martin-slide martin-active"></article>
	<article class="martin-slide"></article>
	<span class="martin-prev"></span>
	<span class="martin-next"></span>
</section>
```

## API

### inst = new Martin(el || selector, options)

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

### Writing a plugin

`Martin.hook(callback)`

Will called with current instance on initialize

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

## Plugins

**[martin-swipe](https://github.com/TrySound/martin-swipe)** - swipe for touchable devices

## Polyfills

- [element.classList](https://github.com/jwilsson/domtokenlist) (core)
