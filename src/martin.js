(function (window, document) {
	var slice = Array.prototype.slice,
		hooks = {},
		plugin = 'martin';

	function Slider(el, opts) {
		var inst = this,
			hookName,
			slide;
		opts = opts || {};

		if(typeof el === 'string') {
			el = document.querySelector(el);
		}

		if(el instanceof Node) {
			inst.slider = el;
			inst.slides = slice.call(el.querySelectorAll('.' + plugin + '-slide'), 0);

			// Callbacks
			inst._cbs = {
				'set': [],
				'slide': [],
				'slidePrev': [],
				'slideNext': []
			};

			// Default style
			el.classList.add(plugin + '-slideshow');

			// active slide
			slide = el.querySelector('.' + plugin + '-slide.' + plugin + '-active');
			if(slide) {
				inst.setTo(inst.slides.indexOf(slide));
			} else {
				inst.setTo(0);
			}

			// Hooks
			for(hookName in hooks) if(hooks.hasOwnProperty(hookName)) {
				hooks[hookName].call(inst, opts);
			}

			return inst;
		}

		throw Error('Martin: unexpected selector or element');
	}

	Slider.prototype = {
		setTo: function (index) {
			var inst = this,
				prev = inst.slides[inst.index],
				next = inst.slides[index];

			if(next && trigger.call(inst, 'set', { index: index })) {
				next = next.classList;
				if(prev) {
					prev = prev.classList;
					prev.add(plugin + '-ditr');
					prev.remove(plugin + '-active');
				}
				next.add(plugin + '-ditr');
				next.add(plugin + '-active');
				inst.slider.offsetHeight;
				if(prev) {
					prev.remove(plugin + '-ditr');
				}
				next.remove(plugin + '-ditr');

				inst.index = index;
			}
		},

		slideTo: function (index, dir) {
			var inst = this,
				current = inst.index,
				max = inst.slides.length,
				prev, next;

			if(max > 0 && index < max && index !== current) {
				if(dir === undefined) {
					dir = index > current;
				}

				if(trigger.call(inst, 'slide', { index: index, dir: dir }) !== false) {
					prev = inst.slides[current].classList;
					next = inst.slides[index].classList;

					// Disable transition
					prev.add(plugin + '-ditr');
					next.add(plugin + '-ditr');
					// Remove last classes
					prev.remove(plugin + '-to-prev');
					prev.remove(plugin + '-to-next');
					next.remove(plugin + '-from-prev');
					next.remove(plugin + '-from-next');
					// Add directions
					prev.add(plugin + (dir ? '-from-prev' : '-from-next'));
					next.add(plugin + (! dir ? '-to-prev' : '-to-next'));
					// Repaint
					inst.slider.offsetHeight;
					// Start transition
					prev.remove(plugin + '-ditr');
					next.remove(plugin + '-ditr');
					prev.remove(plugin + '-active');
					next.add(plugin + '-active');

					inst.index = index;

					return true;
				}
			}

			return false;
		},

		slidePrev: function () {
			var inst = this,
				index = inst.index - 1;
			if(index < 0) {
				index = inst.slides.length - 1;
			}
			if(trigger.call(inst, 'slidePrev', { index: index })) {
				inst.slideTo(index, false);
			}
		},

		slideNext: function () {
			var inst = this,
				index = inst.index + 1;
			if(index > inst.slides.length - 1) {
				index = 0;
			}
			if(trigger.call(inst, 'slideNext', { index: index })) {
				inst.slideTo(index, true);
			}
		},

		on: function (name, fn) {
			var cbs = this._cbs[name];

			if(cbs) {
				cbs.push(fn);
			}
		},

		attr: function (name) {
			var val;
			if(name && typeof name === 'string') {
				val = this.slider.getAttribute('data-' + plugin + '-' + name);
				return val === '' || val === null ? undefined :
						val === 'true' ? true :
						val === 'false' ? false :
						isNaN(val) ? val : Number(val);
			}
		},

		listen: function (selector, event, fn) {
			var el = this.slider;

			if(typeof event === 'function') {
				fn = event;
				event = selector
				selector = false;
			}

			if(selector) {
				el = el.querySelector(selector);
			}

			if(el) {
				el.addEventListener(event, fn);
			}
		}
	};

	function trigger(name, data) {
		var cbs = this._cbs[name],
			i, max,
			result = true;

		for(i = 0, max = cbs.length; i < max; i += 1) {
			if(cbs[i].call(this, data) === false) {
				result = false;
			}
		}

		return result;
	}

	Slider.hook = function (name, fn) {
		if(name && typeof name === 'string' && typeof fn === 'function') {
			hooks[name] = fn;
		}
	};

	window.Martin = Slider;

	document.addEventListener('DOMContentLoaded', function () {
		slice.call(document.querySelectorAll('.' + plugin + '-slideshow'), 0).forEach(function (el) {
			new Slider(el);
		});
	});

} (window, document));
