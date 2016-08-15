var HYDRA = HYDRA || {};
HYDRA.Dropdown = function(settings)
{
	var self = this;
	this.settings = settings || {};
	this.holder = document.createElement('div');
	this.holder.className = 'dropdown';
	this.label = document.createElement('span');
	this.label.onmousedown = function(){self.toggle();}
	this.holder.appendChild(this.label);
	this.arrow = document.createElement('b');
	this.arrow.dropdown = this;
	this.arrow.onmousedown = function(){self.toggle();}
	this.holder.appendChild(this.arrow);
	this.list = document.createElement('ul');
	this.list.style.display = 'none';
	this.holder.appendChild(this.list);	
	this.items = [];
	this.selectedItem = null;
	this.mouseDownFN = function(){var event = arguments[0];self.checkMouseDownOut(event);}
	this.json = new JSON_Loader();
	this.json.addEventListener(Event.COMPLETE, 'onData', this);
	ADD_EVENT_DISPATCHER(this);
}
HYDRA.Dropdown.prototype.checkMouseDownOut = function(event)
{
	var target = event.target;
	while (target)
	{
		if (target == this.holder)
		{
			return true;
		}
		target = target.parentNode;
	}
	this.list.style.display  = 'none';
	removeEventSimple(document, 'mousedown', this.mouseDownFN);
	return false;
}
HYDRA.Dropdown.prototype.toggle = function()
{
	this.list.style.display = (this.list.style.display == '') ? 'none' : '';
	if (this.list.style.display == '')
	{
		addEventSimple(document, 'mousedown', this.mouseDownFN);
	}
	else
	{
		removeEventSimple(document, 'mousedown', this.mouseDownFN);
	}
}
HYDRA.Dropdown.prototype.setValue = function(value)
{
	var selected = false;
	for (var iItem = 0; iItem < this.items.length; iItem++)
	{
		var item = this.items[iItem];
		if (item.data.value == value)
		{
			this.label.innerHTML = item.data.name;
			console.log(item.data, this.label)
			this.selectedItem = item;
			selected = true;
		}
		item.className = ((item.data.value == value) ? 'selected' : '');
	}
	this.pendingValue = ((!selected) ? value : this.pendingValue);
}
HYDRA.Dropdown.prototype.getValue = function(value)
{
	return ((this.selectedItem) ? this.selectedItem.data.value : null);
}
HYDRA.Dropdown.prototype.select = function(value)
{
	this.setValue(value);
	this.dispatchEvent(Event.CHANGE);
	this.list.style.display = 'none';
}
HYDRA.Dropdown.prototype.addItem = function(data)
{
	var self = this;
	var name = data.name;
	var value = ((this.settings.valueId) ? data[this.settings.valueId] : data.value);
	var item = document.createElement('li');
	item.data = {name:name, value:value};
	item.innerHTML = name;
	item.onmousedown = function(){self.select(value);}
	this.list.appendChild(item);
	this.items.push(item);
	if (!this.selectedItem || (this.pendingValue && this.pendingValue == value))
	{
		this.setValue(value);
		this.dispatchEvent(Event.CHANGE);
	}
}
HYDRA.Dropdown.prototype.load = function(url)
{
	this.json.load(url)
}
HYDRA.Dropdown.prototype.onData = function(event)
{
	var data = ((this.settings.parser) ? this.settings.parser(this.json.data) : this.json.data);
	for (var iData = 0; iData < data.length; iData++)
	{
		this.addItem(data[iData]);
	}
}