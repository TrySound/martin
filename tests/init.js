test('initialization', function () {
	var root = document.createElement('div');
	var inst;

	throws(function () {
		new Martin
	}, null,
		'Should throw if element is undefined');

	throws(function () {
		new Martin({})
	}, null,
		'Should throw if first argument is not an element');

	strictEqual(undefined, Martin.get(root),
		'Should not return inst by get');

	inst = new Martin(root);

	deepEqual(inst.el, root,
		'Should use initialized element')

	deepEqual(inst, new Martin(root),
		'Should be initialized once');

	deepEqual(inst, Martin.get(root),
		'Should return inst by get');

	strictEqual(root.className, 'martin',
		'Should add `martin-slideshow` class');
});

test('empty initialization', function () {
	var inst = new Martin(document.createElement('div'));

	strictEqual(inst.index, undefined);
	strictEqual(inst.length, 0);
	strictEqual(inst.prev, null);
	strictEqual(inst.next, null);
	deepEqual(inst._controls, {});

	strictEqual(!!inst.slideTo(), false);
	strictEqual(!!inst.slideTo(0), false);
	strictEqual(!!inst.slideTo(1), false);
	strictEqual(!!inst.slidePrev(), false);
	strictEqual(!!inst.slideNext(), false);
});

test('one slide initialization', function () {
	var inst;
	var root = document.createElement('div');
	var slide = document.createElement('div');
	slide.className = 'martin-slide';

	root.appendChild(slide);
	inst = new Martin(root);

	strictEqual(inst.index, 0);
	strictEqual(inst.length, 1);

	strictEqual(!!inst.slideTo(0), false);
	strictEqual(!!inst.slideTo(1), false);
	strictEqual(!!inst.slidePrev(), false);
	strictEqual(!!inst.slideNext(), false);
});

test('two slide initialization', function () {
	var inst;
	var root = document.createElement('div');
	var slide = document.createElement('div');
	slide.className = 'martin-slide';

	root.appendChild(slide.cloneNode());
	slide.className = 'martin-slide martin-active'
	root.appendChild(slide.cloneNode());

	inst = new Martin(root);

	strictEqual(inst.index, 1);
	strictEqual(inst.length, 2);

	strictEqual(!!inst.slideTo(1), false);
	strictEqual(inst.slideTo(0), true);
	strictEqual(inst.slidePrev(), true);
	strictEqual(inst.slideNext(), true);
});
