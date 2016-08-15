var HYDRA = HYDRA || {};
HYDRA.TextField = function(settings)
{
	var self = this;
	this.settings = settings || {};
	this.holder = document.createElement('div');
	this.holder.className = 'textField';

	this.input = document.createElement('input');
	this.input.setAttribute('placeholder', ((settings.placeholder) ? settings.placeholder : ''));
	this.input.setAttribute('maxlength', ((settings.maxlength) ? settings.maxlength : ''));
	this.input.oninput = function(event)
	{
		if (self.settings.restrict)
		{
			this.value = this.value.replace(self.settings.restrict, '');
		}
		if (self.settings.onKey)
		{
			var value = self.settings.onKey(this.value);
			if (value != this.value)
			{
				this.value = value;
			}
		}
		self.dispatchEvent(Event.CHANGE);
	}
	this.holder.appendChild(this.input);
	ADD_EVENT_DISPATCHER(this);
}
HYDRA.TextField.prototype.setValue = function(value)
{
	if (this.settings.onKey)
	{
		this.input.value = this.settings.onKey(value);
	}
	else
	{
		this.input.value = value;
	}
}
HYDRA.TextField.prototype.getValue = function()
{
	if (this.settings.getValue)
	{
		return this.settings.getValue(this.input.value);
	}
	return this.input.value;
}