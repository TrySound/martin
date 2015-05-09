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

		if(el) {
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

			// Default slide
			inst.setTo(0);

			// Hooks
			for(hookName in hooks) if(hooks.hasOwnProperty(hookName)) {
				hooks[hookName].call(inst, opts);
			}

			return inst;
		}

		return {};
	}

	Slider.prototype = {
		setTo: function (index) {
			var inst = this,
				prev = inst.slides[inst.index],
				next = inst.slides[index];

			if(next) {
				if(prev) {
					prev.classList.add(plugin + '-ditr');
					prev.classList.remove(plugin + '-active');
				}
				next.classList.add(plugin + '-ditr', plugin + '-active');
				next.offsetHeight;
				if(prev) {
					prev.classList.remove(plugin + '-ditr');
				}
				next.classList.remove(plugin + '-ditr');

				inst.index = index;

				trigger.call(inst, 'set');
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

				if(inst.playing) {
					inst.play();
				}

				prev = inst.slides[current];
				next = inst.slides[index];

				// Disable transition
				prev.classList.add(plugin + '-ditr');
				next.classList.add(plugin + '-ditr');
				// Remove last classes
				prev.classList.remove(plugin + '-to-prev', plugin + '-to-next');
				next.classList.remove(plugin + '-from-prev', plugin + '-from-next');
				// Add directions
				prev.classList.add(dir ? (plugin + '-from-prev') : (plugin + '-from-next'));
				next.classList.add( ! dir ? (plugin + '-to-prev') : (plugin + '-to-next'));
				// Repaint
				next.offsetHeight;
				prev.classList.remove(plugin + '-ditr');
				next.classList.remove(plugin + '-ditr');
				// Start transition
				prev.classList.remove(plugin + '-active');
				next.classList.add(plugin + '-active');

				trigger.call(inst, 'slide', { dir: dir });

				inst.index = index;
				return true;
			} else {
				return false;
			}
		},

		slidePrev: function () {
			var inst = this,
				index = inst.index - 1;
			if(index < 0) {
				index = inst.slides.length - 1;
			}
			inst.slideTo(index, false);
			trigger.call(inst, 'slidePrev');
		},

		slideNext: function () {
			var inst = this,
				index = inst.index + 1;
			if(index > inst.slides.length - 1) {
				index = 0;
			}
			inst.slideTo(index, true);
			trigger.call(inst, 'slideNext');
		},

		play: function (timeout) {
			var inst = this;

			if(inst.slider) {
				inst.stop();

				if(timeout === undefined) {
					timeout = inst._playTimeout;
				} else {
					inst._playTimeout = timeout;
				}

				inst._playInst = setTimeout(function() {
					requestAnimationFrame(function() {
						inst.slideNext();
					});
				}, timeout);
				inst.playing = true;
			}
		},

		stop: function () {
			if(this.playing) {
				clearTimeout(this._playInst);
				this.playing = false;
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
			var el = this.slider.querySelector(selector);

			if(el) {
				el.addEventListener(event, fn);
			}
		}
	};

	function trigger(name, data) {
		var cbs = this._cbs[name],
			i, max;

		for(i = 0, max = cbs.length; i < max; i += 1) {
			cbs[i].call(this, data);
		}
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

/* autoplay option */
Martin.hook('autoplay', function (opts) {
	var attr = this.attr('autoplay'),
		opt = isNaN(attr) ? opts.autoplay : attr;

	if(opt) {
		this.play(opt);
	}
});

/* control buttons */
Martin.hook('controls', function (opts) {
	var inst = this,
		slider = inst.slider,
		prev = inst.attr('prev') || opts.prev || '.martin-prev',
		next = inst.attr('next') || opts.next || '.martin-next';

	inst.listen(prev, 'click', function () {
		inst.slidePrev();
	});

	inst.listen(next, 'click', function () {
		inst.slideNext();
	});

});
