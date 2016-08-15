var HYDRA = HYDRA || {};
HYDRA.Checkbox = function(settings)
{
  var self = this;
  this.value = settings.value || false;
  this.holder = document.createElement('div');
  this.holder.className = 'checkbox' + (this.value ? ' select' : '');
  this.holder.innerHTML = '<b></b>' + settings.name;
  this.holder.onmousedown = function()
  {
    self.toggle();
  }
  ADD_EVENT_DISPATCHER(this);
}
HYDRA.Checkbox.prototype.toggle = function()
{
  this.setValue(!this.value);
  this.dispatchEvent(Event.CHANGE);
}
HYDRA.Checkbox.prototype.setValue = function(value)
{
  this.value = value;
  this.holder.className = 'checkbox' + (value ? ' select' : '');
}
HYDRA.Checkbox.prototype.getValue = function()
{
  return this.value;
}
