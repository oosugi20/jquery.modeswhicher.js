;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Modeswitcher';
var PLUGIN_NAME = 'modeswitcher';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		prefix: 'type-'
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this._prepareElms();
		this._eventify();
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
		this.$content = this.$el.find('[data-modeswitcher-content]');
		this.$controller = this.$el.find('[data-modeswitcher-controller]');
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		var _this = this;

		this.$el.on('click', '[data-modeswitcher-btn]', function (e) {
			var name = $(this).closest('[data-modeswitcher-controller]').attr('data-modeswitcher-controller');
			var mode = $(this).attr('data-modeswitcher-btn');

			console.log(name, mode);
			_this.modeTo(name, mode);
			
			e.preventDefault();
		});
	};

	/**
	 * _getTargetContent
	 */
	fn._getTargetContent = function (name) {
		return this.$content.filter('[data-modeswitcher-content="' + name + '"]');
	};

	/**
	 * _getTargetController
	 */
	fn._getTargetController = function (name) {
		return this.$controller.filter('[data-modeswitcher-controller="' + name + '"]');
	};

	/**
	 * modeTo
	 */
	fn.modeTo = function (name, mode) {
		var prefix = this.options.prefix;
		var class_name = prefix + mode;

		var $targetContent = this._getTargetContent(name);
		var $targetController = this._getTargetController(name);

		var current_mode = $targetController.attr('data-modeswitcher-mode');
		var current_class_name = prefix + current_mode;

		$targetContent.removeClass(current_class_name);
		$targetContent.addClass(class_name);

		$targetController.removeClass(current_class_name);
		$targetController.addClass(class_name);

		$targetController.attr('data-modeswitcher-mode', mode);
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
