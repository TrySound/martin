(function (global) {
	var document = global.document,
		plugin = 'martin',
		classActive = plugin + '-active',
		initialized = [],
		instances = [],
		hooks = {};

	if(typeof exports === 'object') {
		module.exports = Slider;
	} else {
		global.Martin = Slider;
	}

	function Slider(el, opts) {
		var inst, key, index,
			slides, slide, slideList, activeList;

		opts = opts || {};

		if(typeof el === 'string') {
			el = document.querySelector(el);
		}

		if(el instanceof Node) {
			if(inst = Slider.get(el)) {
				return inst;
			}
			inst = this;
			initialized.push(el);
			instances.push(inst);

			// Root
			el.classList.add(plugin);
			inst.el = el;

			// Slides
			slides = el.querySelectorAll('.' + plugin + '-slide');
			key = inst.length = slides.length;
			if(key) {
				for(key -= 1; ~key; key -= 1) {
					slide = inst[key] = slides[key];
					// Clear active slides
					slideList = slide.classList;
					if(slideList.contains(classActive)) {
						index = key;
						activeList = slideList;
						activeList.remove(classActive);
					}
				}
				// Activate
				if( ! activeList) {
					index = 0;
					activeList = slideList;
				}
				activeList.add(classActive);
				inst.index = index;
			}

			// Callbacks
			inst.cbs = {
				'init': [],
				'slide': [],
				'slidePrev': [],
				'slideNext': []
			};

			// Hooks
			for(key in hooks) if(hooks.hasOwnProperty(key)) {
				inst['_' + key] = {};
				hooks[key].call(inst, opts);
			}

			trigger(inst, 'init');

			return inst;
		}

		throw Error('Martin: unexpected selector or element');
	}

	Slider.prototype = {
		slideTo: function (index, dir) {
			var inst = this,
				activeIndex = inst.index,
				prev, next,
				classTr = plugin + '-tr';

			if(-1 < index && index < inst.length && index !== activeIndex) {
				dir = inst.option(dir, index > activeIndex)
				prev = inst[activeIndex].classList;
				next = inst[index].classList;

				if(trigger(inst, 'slide', { index: index, dir: dir })) {
					// Remove last classes
					prev.remove(classTr);
					prev.remove(plugin + '-to-prev');
					prev.remove(plugin + '-to-next');
					next.remove(classTr);
					next.remove(plugin + '-from-prev');
					next.remove(plugin + '-from-next');
					// Add directions
					prev.add(plugin + (dir ? '-from-prev' : '-from-next'));
					next.add(plugin + ( ! dir ? '-to-prev' : '-to-next'));
					// Repaint
					inst.el.offsetHeight;
					// Start transition
					prev.add(classTr);
					next.add(classTr);
					prev.remove(classActive);
					next.add(classActive);

					inst.index = index;

					return true;
				}
			}
		},

		slidePrev: function () {
			var inst = this,
				index = inst.index - 1;
			if(index === -1) {
				index = inst.length - 1;
			}
			if(trigger(inst, 'slidePrev', { index: index })) {
				return inst.slideTo(index, false);
			}
		},

		slideNext: function () {
			var inst = this,
				index = inst.index + 1;
			if(index === inst.length) {
				index = 0;
			}
			if(trigger(inst, 'slideNext', { index: index })) {
				return inst.slideTo(index, true);
			}
		},

		on: function (name, fn) {
			var inst = this,
				cbs = inst.cbs[name];

			if(cbs && typeof fn === 'function') {
				cbs.shift(fn.bind(inst));
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

		attr: function (attr) {
			if(typeof attr === 'string') {
				attr = this.el.getAttribute('data-' + plugin + '-' + attr);
				return attr === '' || attr === null ? undefined :
						attr === 'true' ? true :
						attr === 'false' ? false :
						isNaN(attr) ? attr : Number(attr);
			}
		},

		listen: function (selector, event, fn) {
			var el = this.el;

			if(typeof event === 'function') {
				fn = event;
				event = selector
				selector = false;
			}

			if(typeof selector === 'string') {
				el = el.querySelector(selector);
			}

			if(selector instanceof Node) {
				el = selector;
			}

			if(el) {
				el.addEventListener(event, fn);
			}

			return el;
		}
	};

	function trigger(inst, name, data) {
		var cbs = inst.cbs[name],
			i = cbs.length - 1,
			result = true;

		for( ; ~i; i -= 1) {
			if(cbs[i](data) === false) {
				result = false;
			}
		}

		return result;
	}

	Slider.get = function (el) {
		el = initialized.indexOf(el);
		if(~el) {
			return instances[el];
		}
	};

	Slider.hook = function (name, fn) {
		if(typeof name === 'string' && typeof fn === 'function') {
			hooks[name] = fn;
		}
	};

	document.addEventListener('DOMContentLoaded', function () {
		var el = document.querySelectorAll('.' + plugin + '-slideshow'),
			i = el.length - 1;

		for( ; ~i; i -= 1) {
			new Slider(el[i]);
		}
	});

} ((0, eval)(this)));
