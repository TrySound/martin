Martin.hook('controls', function (opts) {
	var inst = this,
		prev = inst.attr('prev') || opts.prev || '.martin-prev',
		next = inst.attr('next') || opts.next || '.martin-next';

	inst.prev = inst.listen(prev, 'click', function () {
		inst.slidePrev();
	});

	inst.next = inst.listen(next, 'click', function () {
		inst.slideNext();
	});
});
