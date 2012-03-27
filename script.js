$(function() {
	jQuery.fn.outerHTML = function(s) {
	    return s
	        ? this.before(s).remove()
	        : jQuery("<p>").append(this.eq(0).clone()).html();
	};

	var code_el = $('#btn-code'),
		btn_el = $('#btn');

	var getValues = function() {
		var values = {};

		$('.params input').each(function() {
			var el = $(this);

			values[el.attr('id').replace('param-', '')] = el.val() || el.attr('placeholder');
		});

		return values;
	}

	var generateButtonCode = function() {
		var values = getValues(),
			btn = $('<a/>', {
				'href'			: values.redirect || 'javascript:void(0);',
				'class'			: 'dwolla_button',
				'html'			: values.text,
				'data-dest'		: values.dest,
				'data-name'		: values.name,
				'data-desc'		: values.desc,
				'data-amount'	: values.amount,
				'data-shipping'	: values.shipping || 0,
				'data-tax'		: values.tax || 0,
			});

		btn_el.html(btn);
		code_el.text(btn.outerHTML());

		if(typeof DwollaBtn !== 'undefined') {
			DwollaBtn.styleButtons();
		}
	}

	$('.params input').keyup(function() {
		generateButtonCode();
	});

	generateButtonCode();
}());
