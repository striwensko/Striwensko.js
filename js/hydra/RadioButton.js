var HYDRA = HYDRA || {};
HYDRA.RadioButton = function(settings)
{
	var self = this;
	this.value = settings.value;
	this.checked = false;
	this.group = settings.group;
	this.value = settings.value || false;
	this.holder = document.createElement('div');
	this.holder.className = 'radioButton' + (this.checked ? ' select' : '');
	this.holder.innerHTML = '<b></b>' + settings.name;
	this.holder.onmousedown = function()
	{
		self.select();
	}
	if (!HYDRA.RadioButton.groups[this.group])
	{
		HYDRA.RadioButton.groups[this.group] = new Array();
	}
	HYDRA.RadioButton.groups[this.group].push(this);
	ADD_EVENT_DISPATCHER(this);
}
HYDRA.RadioButton.groups = {};
HYDRA.RadioButton.prototype.select = function()
{
	var items = HYDRA.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++)
	{
		var item = items[iRadio];
		item.checked = (item == this);
		item.holder.className = 'radioButton' + ((item == this) ? ' select' : '');
	}
  this.dispatchEvent(Event.CHANGE);
}
HYDRA.RadioButton.prototype.setValue = function(value)
{
	var items = HYDRA.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++)
	{
		var item = items[iRadio];
		item.checked = (item.value == value);
		item.holder.className = 'radioButton' + ((item.value == value) ? ' select' : '');
	}
}
HYDRA.RadioButton.prototype.getValue = function()
{
	var items = HYDRA.RadioButton.groups[this.group];
	for (var iRadio = 0; iRadio < items.length; iRadio++)
	{
		var item = items[iRadio];
		if (item.checked)
		{
			return item.value;
		}
	}
	return null;
}