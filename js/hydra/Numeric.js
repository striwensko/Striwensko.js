var HYDRA = HYDRA || {};
HYDRA.Numeric = function (settings)
{
	var self = this;
	var restrict = /[^0-9\.]/gim;
	this.settings = settings || {};
	this.holder = document.createElement('div');
	this.holder.className = 'textField';
	this.max = settings.max;
	this.min = settings.min;
	this.decimals = settings.decimals;
	this.addCommas = settings.addCommas;
	this.prefix = (settings.prefix) ? settings.prefix : '';
	this.suffix = (settings.suffix) ? settings.suffix : '';

	this.input = document.createElement('input');
	this.input.onfocus = function()
	{
		this.value = this.value.replace(restrict, '');
	}
	this.input.oninput = function(event)
	{
		this.value = this.value.replace(restrict, '');
		if (event)
		{
			self.dispatchEvent(Event.CHANGE);
		}
	}
	this.input.onblur = function()
	{
		self.format();
	}
	this.holder.appendChild(this.input);
	ADD_EVENT_DISPATCHER(this);
}
HYDRA.Numeric.prototype.format = function()
{
	var value = Number(this.input.value);

	if ((!isNaN(this.max)) && (this.max != null))
	{
		value = Math.min(value, this.max)
	}

	if ((!isNaN(this.min)) && (this.min != null))
	{
		value = Math.max(value, this.min)
	}
	this.value = value;

	var decimals = this.value % 1;
	var integer = Math.floor(this.value).toString();
	if (this.value < 0)
	{
		integer = Math.ceil(this.value).toString();
	}
	if (this.addCommas)
	{
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(integer))
		{
			integer = integer.replace(rgx, '$1' + ',' + '$2');
		}
	}

	text = integer + ((decimals != 0) ? ('.' + decimals) : '');

	if ((!isNaN(this.decimals)) && (this.decimals != null) && (this.decimals != 0))
	{
		text = integer + '.' + decimals.toFixed(this.decimals).split('.')[1];
	}
	this.input.value = this.prefix + text + this.suffix;
}
HYDRA.Numeric.prototype.setValue = function(value)
{
	this.input.value = value;
	this.input.oninput();
	this.format();
}
HYDRA.Numeric.prototype.getValue = function()
{
	return this.value;
}