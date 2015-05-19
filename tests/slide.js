test('slide', function () {
	var inst;
	var root = document.createElement('div')
	var slide = document.createElement('div');
	slide.className = 'martin-slide';

	root.appendChild(slide.cloneNode());
	root.appendChild(slide.cloneNode());
	root.appendChild(slide.cloneNode());

	inst = new Martin(root);

	strictEqual(inst.length, 3);
	strictEqual(inst.index, 0);
	strictEqual(inst[0].classList.contains('martin-active'), true);

	inst.slideTo(2);
	strictEqual(inst.index, 2);
	strictEqual(inst[2].classList.contains('martin-active'), true);
	strictEqual(inst[0].classList.contains('martin-active'), false);

	inst.slideNext()
	strictEqual(inst.index, 0)

	inst.slidePrev()
	strictEqual(inst.index, 2)
});
