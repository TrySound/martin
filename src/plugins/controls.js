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
