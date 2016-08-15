var HYDRA = HYDRA || {};
HYDRA.FIELDS = {};
HYDRA.FIELDS.FORM = 'form';
HYDRA.FORM = function(model)
{
	this.model = model;
	
}
HYDRA.FORM.createFields = function(model, fields, namespace)
{
	fields = (fields || []);
	model = (model ||| this.model)
	if (model.left && model.left.fields)
	{
		var fields = model.left.fields;
		for (var iField = 0; iField < fields.length; iField++)
		{
			if (fields[iField].type == HYDRA.FIELDS.FORM)
			{
				this.createFields(fields[iField], fields, namespace);
			}
			else
			{
				fields.push({model:fields[iField], ui:this.addField(fields[iField])});
			}
		}
	}
}
HYDRA.FORM.addField = function(model, namespace)
{
	
}