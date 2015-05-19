test('data-* attrs processing', function () {
	var inst = new Martin(document.createElement('div'));

	strictEqual(inst.attr('opt'), undefined);
	inst.el.setAttribute('data-martin-opt', true);
	strictEqual(inst.attr('opt'), true);
	inst.el.setAttribute('data-martin-opt', false);
	strictEqual(inst.attr('opt'), false);
	inst.el.setAttribute('data-martin-opt', 'null');
	strictEqual(inst.attr('opt'), 'null');
	inst.el.setAttribute('data-martin-opt', undefined);
	strictEqual(inst.attr('opt'), 'undefined');
	inst.el.setAttribute('data-martin-opt', 10);
	strictEqual(inst.attr('opt'), 10);
	inst.el.setAttribute('data-martin-opt', -10);
	strictEqual(inst.attr('opt'), -10);
	inst.el.setAttribute('data-martin-opt', 'string');
	strictEqual(inst.attr('opt'), 'string');
});

test('options processing', function () {
	var inst = new Martin(document.createElement('div'));

	strictEqual(inst.option(), undefined);
	strictEqual(inst.option(undefined), undefined);
	strictEqual(inst.option(null, undefined), null);
	strictEqual(inst.option(1, 2, 4), 1);
	strictEqual(inst.option(null, 3), null);
	strictEqual(inst.option(undefined, 2, 4), 2);
});

test('listening', function () {
	var inst = new Martin(document.createElement('div'));
	var fixture = document.createElement('div');
	fixture.className = 'prev';

	strictEqual(inst.listen('.prev', 'click', function () {}), null);

	inst.el.appendChild(fixture);
	strictEqual(inst.listen('.prev', 'click', function () {}), fixture);
	strictEqual(inst.listen(fixture, 'click', function () {}), fixture);

	strictEqual(inst.listen('click', function () {}), inst.el);
});
