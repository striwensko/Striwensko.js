var HYDRA = HYDRA || {};
HYDRA.DATA = {data:{}, fields:{}};
ADD_EVENT_DISPATCHER(HYDRA.DATA);


HYDRA.DATA.clear = function()
{
	this.data = {};
	this.fields = {};
}
/*
DATA.load = function(id)
{
	var url = ROUTE.buildURL(this.sources[id].url, this.data);
	var json = new JSON_Loader();
	json.load(url);
	json.namespace = this.sources[id].namespace;
	json.addEventListener(Event.COMPLETE, 'onData', this);
	this.loadingSources.push(json);
}
DATA.onData = function(event)
{
	var data = event.currentTarget.data;
	var checkPremission = false;
	for (var iSource = 0; iSource < this.loadingSources.length; iSource++)
	{
		if (event.currentTarget == this.loadingSources[iSource])
		{
			if (this.loadingSources.length == 1)
			{
				checkPremission = true;
			}
			this.loadingSources.splice(iSource, 1);
		}
	}
	if (data.error)
	{
		alert(data.error.message);
		return false;
	}
	
	this.apply(data, event.currentTarget.namespace);
}
DATA.save = function(model)
{
	var isVerify = true;
	
	var data = {};
	var source = model.source;
	
	for (var iSource = 0; iSource < source.length; iSource++)
	{
		var module = this.getModule(source[iSource]);
		
		if (!module.isReady())
		{
			isVerify = false;
		}
		else
		{
			module.getData(data);
			//console.log(data);
		}
		
	}
	
	if (isVerify)
	{
		data = JSON.stringify(data);
		console.log(model)
		var jsonLoader = new JSON_Loader();
		jsonLoader.fn = model.fn;
		jsonLoader.load(model.url, data, 'application/json; charset=UTF-8', model.requestMethod);
		jsonLoader.addEventListener(Event.COMPLETE, 'onSave', this);
		return true;
	}
	else
	{
		return false;
	}
}
DATA.onSave = function(event)
{
	var data = event.currentTarget.data;
	var namespace = event.currentTarget.namespace || "";
	
	this.dispatchEvent(Event.SAVE);
	
	DATA.apply(data, namespace);
	
	if (event.currentTarget.fn)
	{
		event.currentTarget.fn(data);
	}
}*/

HYDRA.DATA.addField = function(field, id, namespace, bind)
{
	if (namespace)
	{
		if (!this.fields[namespace])
		{
			this.fields[namespace] = {};
		}
		if (!this.data[namespace])
		{
			this.data[namespace] = {};
		}
		this.fields[namespace][id] = field;
	}
	else
	{
		this.fields[id] = field;
	}
	
	field.hydra_data = {id:id, namespace:namespace};
	field.addEventListener(Event.CHANGE, 'onUpdateField', this);
	if (bind)
	{
		var events = bind.events;
		for (var iBind = 0; iBind < bind.events.length; iBind++)
		{
			this.addEventListener(((namespace) ? (namespace + '.') : '') +  bind.events[iBind], 'update', field);
		}
		field.update = bind.fn;
	}
}
HYDRA.DATA.onUpdateField = function(event)
{
	var field = event.currentTarget;
	if (field.hydra_data.namespace)
	{
		this.data[field.hydra_data.namespace][field.hydra_data.id] = field.getValue();
		this.dispatchEvent(field.hydra_data.namespace + '.' + field.hydra_data.id);
	}
	else
	{
		this.data[field.hydra_data.id] = field.getValue();
		this.dispatchEvent(field.hydra_data.id);
	}
}
HYDRA.DATA.removeField = function(id, namespace)
{
	if (namespace && this.fields[namespace])
	{
		this.fields[namespace][id] = null;
	}
	else
	{
		this.fields[id] = field;
	}
}
HYDRA.DATA.getField = function(id, namespace)
{
	if (namespace && this.fields[namespace])
	{
		return this.fields[namespace][id];
	}
	return this.fields[id] = field;
}
HYDRA.DATA.getData = function(properties, namespace)
{
	var data = {};
	for (var iProperty = 0; iProperty < properties.length; iProperty++)
	{
		var property = properties[iProperty];
		data[property] = this.getValue(property, namespace)
	}
	return data;
}
HYDRA.DATA.getValue = function(id, namespace)
{
	if (namespace && this.fields[namespace])
	{
		return this.data[namespace][id];
	}
	return this.data[id];
}
HYDRA.DATA.apply = function(namespace, source)
{
	var data = ((namespace) ? this.data[namespace] : this.data);
	var fields = ((namespace) ? this.fields[namespace] : this.fields);
	if (!data)
	{
		this.data[namespace] = {};
		data = this.data[namespace];
	}
	for (var property in source)
	{
		if (source.hasOwnProperty(property))
		{
			data[property] = source[property];
			if (fields[property])
			{
				fields[property].setValue(source[property])
			}
		}
	}
}

