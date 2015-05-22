# martin [![Build Status][ci-img]][ci] [![Gitter][chat-img]][chat]

[chat-img]: https://badges.gitter.im/Join%20Chat.svg
[ci-img]:   https://travis-ci.org/TrySound/martin.svg
[chat]:     https://gitter.im/TrySound/martin
[ci]:       https://travis-ci.org/TrySound/martin

Extendable vanillaJS slider

## Supported browsers

Works fine in modern browsers, for older must be used [element.classList](http://caniuse.com/#feat=classlist) polyfill

- ie9 (without transitions)
- ie10+

### Polyfills

- [DOMTokenList](https://github.com/jwilsson/domtokenlist) (element.classList)

## Plugins

- **[martin-swipe](https://github.com/TrySound/martin-swipe)**
- **[martin-autoplay](https://github.com/TrySound/martin-autoplay)**
- **[martin-finite](https://github.com/TrySound/martin-finite)**
- **[martin-pager](https://github.com/TrySound/martin-pager)**
- **[martin-tr](https://github.com/TrySound/martin-tr)**

## Usage

```html
<!-- .martin-slideshow will be initialized on document ready -->
<section class="martin-slideshow martin-fx-horz">
	<!-- Height based on first slide -->
	<article class="martin-slide"></article>
	<!-- Active class recommended to prevent flashing -->
	<article class="martin-slide martin-active"></article>
	<article class="martin-slide"></article>
	<span class="martin-prev"></span>
	<span class="martin-next"></span>
</section>
```

### Effects

Effect is on of this css classes:

- `.martin-fx-horz`
- `.martin-fx-vert`
- `.martin-fx-fade`
- `.martin-fx-leave`

### Controls

Prev and next buttons

**Options**

```html
<div class="martin-slideshow"
	data-martin-prev=".martin-prev"
	data-martin-next=".martin-next"></div>
```

```js
{
  prev: '.martin-prev',
  next: '.martin-next'
}
```

## API

### inst = new Martin(el || selector, options)

**inst.slideTo(index, direction)**

`callback({ index, direction })`

**inst.slidePrev()**

`callback({ index })`

**inst.slideNext()**

`callback({ index })`

**inst.on(event, callback)**

`event` is one of `init`, `slide`, `slidePrev`, `slideNext`

Action will be prevented if callback will return `false`

### Helpers

**inst.attr(name)**

Returns data-martin-* attribute value with related type

**inst.option()**

Returns first 'defined' argument

**inst.listen(event, callback)**

Listen system event on slider root-element

**inst.listen(selector, event, callback)**

Listen system event on slider children elements

**Martin.get(el)**

Returns instance of Martin by element

### Writing a plugin

`Martin.hook(callback)`

To combine hooks you may use `init` event:

```js
Martin.hook('plugin', function (opts) {
	this.on('init', function () {
		// All hooks are ready
	});
});
```

Will called with current instance on initialize

##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
