(function (window, document) {
	var slice = [].slice,
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
			inst.cbs = {
				'init': [],
				'set': [],
				'slide': [],
				'slidePrev': [],
				'slideNext': []
			};

			// Hooks
			for(hookName in hooks) if(hooks.hasOwnProperty(hookName)) {
				inst['_' + hookName] = {};
				hooks[hookName].call(inst, opts);
			}

			// Default style
			el.classList.add(plugin + '-slideshow');

			// active slide
			slide = el.querySelector('.' + plugin + '-slide.' + plugin + '-active');
			
			inst.setTo(slide ? inst.slides.indexOf(slide) : 0);

			trigger.call(inst, 'init');

			return inst;
		}

		throw Error('Martin: unexpected selector or element');
	}

	Slider.prototype = {
		setTo: function (index) {
			var inst = this,
				prev = inst.slides[inst.index],
				next = inst.slides[index],
				ditr = plugin + '-ditr',
				active = plugin + '-active';

			if(next && trigger.call(inst, 'set', { index: index })) {
				next = next.classList;
				if(prev) {
					prev = prev.classList;
					prev.add(ditr);
					prev.remove(active);
				}
				next.add(ditr);
				next.add(active);
				inst.slider.offsetHeight;
				if(prev) {
					prev.remove(ditr);
				}
				next.remove(ditr);

				inst.index = index;

				return true;
			}
		},

		slideTo: function (index, dir) {
			var inst = this,
				slides = inst.slides,
				current = inst.index,
				max = slides.length,
				prev, next,
				ditr = plugin + '-ditr';

			// index = Number(index);
			if(-1 < index && index < max && index !== current) {
				dir = inst.option(dir, index > current)
				prev = slides[current];
				next = slides[index];

				if(prev && next && trigger.call(inst, 'slide', { index: index, dir: dir })) {
					prev = slides[current].classList;
					next = slides[index].classList;

					// Disable transition
					prev.add(ditr);
					next.add(ditr);
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
					prev.remove(ditr);
					next.remove(ditr);
					prev.remove(plugin + '-active');
					next.add(plugin + '-active');

					inst.index = index;

					return true;
				}
			}
		},

		slidePrev: function () {
			var inst = this,
				index = inst.index - 1;
			if(index < 0) {
				index = inst.slides.length - 1;
			}
			if(trigger.call(inst, 'slidePrev', { index: index })) {
				return inst.slideTo(index, false);
			}
		},

		slideNext: function () {
			var inst = this,
				index = inst.index + 1;
			if(index > inst.slides.length - 1) {
				index = 0;
			}
			if(trigger.call(inst, 'slideNext', { index: index })) {
				return inst.slideTo(index, true);
			}
		},

		on: function (name, fn) {
			var cbs = this.cbs[name];

			if(cbs) {
				cbs.push(fn);
			}
		},

		option: function () {
			var args = arguments,
				i, max;

			for(i = 0, max = args.length; i < max; i++) {
				if(args[i] !== undefined) {
					return args[i];
				}
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

			return el;
		}
	};

	function trigger(name, data) {
		var cbs = this.cbs[name],
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
		if(typeof name === 'string' && typeof fn === 'function') {
			hooks[name] = fn;
		}
	};

	document.addEventListener('DOMContentLoaded', function () {
		var el = document.querySelectorAll('.' + plugin + '-slideshow'),
			i = el.length - 1;

		for( ; i !== -1; i -= 1) {
			new Slider(el[i]);
		}
	});

	window.Martin = Slider;

} (window, document));
