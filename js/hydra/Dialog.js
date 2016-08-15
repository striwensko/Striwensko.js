Dialog = function(settings)
{
	var self = this;
	this.holder = document.createElement('div');
	this.holder.className = 'overlay';
	this.holder.onmousedown = function(event)
	{
		if (event.target == this)
		{
			self.close();
		}
	}
	this.holder.style.display = 'none';
	this.dialog = document.createElement('div');
	this.dialog.className = 'dialog bar';
	this.holder.appendChild(this.dialog);
	
	this.title = document.createElement('div');
	this.title.className = 'title';
	this.title.innerHTML = settings.title;
	this.dialog.appendChild(this.title);

	this.container = document.createElement('div');
	this.container.className = 'container';
	this.dialog.appendChild(this.container);
	
	this.bar = document.createElement('div');
	this.bar.className = 'bar';
	this.dialog.appendChild(this.bar);
	
	for (var iButton = 0; iButton < settings.buttons.length; iButton++)
	{
		var button = document.createElement('div');
		button.className = 'ui-button';
		button.innerHTML = settings.buttons[iButton].name;
		button.__onclick = settings.buttons[iButton].onclick;
		button.onclick = function()
		{
			this.__onclick.apply(self);
		}
		this.bar.appendChild(button);
	}
	
	this.timeLine = new TimeLine(600, 33);
	this.timeLine.addEventListener(Event.CHANGE, 'render', this);
	ADD_EVENT_DISPATCHER(this);
}
Dialog.prototype.show = function(model)
{
	this.timeLine.direction = 1;
	this.timeLine.play();
}
Dialog.prototype.close = function()
{
	this.timeLine.direction = -1;
	this.timeLine.play();
	this.dispatchEvent(Event.CLOSE);
}
Dialog.prototype.render = function()
{
	this.holder.style.opacity = this.timeLine.getTime(0, 300);
	this.holder.style.display = ((this.timeLine.position == 0) ? 'none' : '');
	TimeLine.applyMatrix(this.dialog, {y:-50 + 50 * this.timeLine.getTime(300, 300)})
	this.dialog.style.opacity = this.timeLine.getTime(300, 300);
	this.dialog.style.display = ((this.timeLine.position < 300) ? 'none' : '');
}