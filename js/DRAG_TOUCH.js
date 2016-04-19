/**
*	This class can be used to make drag interactions, is compatible with both touch events and mouse events.
*	This allows to build sliders that work on device, touch or mouse enable or devices which support both.
*	@class
*   @fires Event:MOVE Fires the mouse is moving
*   @fires Event:STOP When the drag action has finish
*	@see {@link https://jsfiddle.net/k1v4g5rw/2/} Horizontal Scrolling
*	@see {@link https://jsfiddle.net/ff4jzjnn/2/} Vertical Scrolling
*/
DragTouch = function()
{
	this.startX = 0;
	this.endY = 0;
	
	ADD_EVENT_DISPATCHER(this);
	
	var self = this;
	this.__moveFN = function(event){self.moveFN(event);event.preventDefault();};
	this.__endFN = function(event){self.end(event);event.preventDefault();};
}
DragTouch.ZOOM = 'zoom';
DragTouch.prototype.start = function (event)
{
	this.startX = (event.touches) ? event.touches[0].clientX : event.clientX;
	this.startY = (event.touches) ? event.touches[0].clientY : event.clientY;
	this.moveX = 0;
	this.moveY = 0;
	this.endX = this.startX;
	this.endY = this.startY;
	this.zoom = null;
	//console.log(this.startX, this.startY, event.touches, this.endX, this.endY);
	this.dispatchEvent(Event.START);
	
	this.HTML_DIV = null;
	event.preventDefault();
	
	if (event.type == "touchstart")
	{
		addEventSimple(document, "touchmove", this.__moveFN);
		addEventSimple(document, "touchend", this.__endFN);
	}
	else if (event.type == "mousedown")
	{
		addEventSimple(document, "mousemove", this.__moveFN);
		addEventSimple(document, "mouseup", this.__endFN);
	}


	return false;
}
/**
*	Init the dragging of an object
*	@param {event} event The original dom event that fire this interaction, must be a mousedown or a touchstart.
*	@param {element} htmlID The dom element to be dragged in case of null events will fire and you can read how much the  mouse position has changed from the beggining in this case i'll consider that the initial position was 0, 0.
*	@param {object} limits The limits of an imaginary box in which the object can be dragged, The properties can be left, right to limit horizontal dragging, top, bottom to limit vertical dragging, not sending any wil mean the element is free to drag in any direciton without limit. See examples to view some use cases.
*/
DragTouch.prototype.startDrag = function (event, htmlID, limits)
{
	// AVOID FIRING AGAIN ON ZOOM
	if (this.isActive)
	{
		return false;
	}
	this.isActive = true;
	
	
	this.hasMove = false;
	this.start(event)
	limits = limits || {};
	
	if (htmlID)
	{
		this.HTML_DIV = (htmlID);
		
		this.divX_Start = this.HTML_DIV.offsetLeft;
		this.divY_Start = this.HTML_DIV.offsetTop;
		
		this.position = {x:this.divX_Start, y:this.divY_Start};
	}
	else
	{
		this.position = {x:0, y:0};
	}
	
	this.leftLimit = (limits.left != limits.undefined) ? limits.left : null;
	this.topLimit = (limits.top != limits.undefined) ? limits.top : null;
	this.rightLimit = (limits.right != limits.undefined) ? limits.right : null;;
	this.bottomLimit = (limits.bottom != limits.undefined) ? limits.bottom : null;;
	
	this.moveFree = (this.leftLimit == null) && (this.topLimit == null) && (this.rightLimit == null) && (this.bottomLimit == null);
	this.move = {x:0, y:0};
	
	return true;
}

DragTouch.prototype.moveFN = function (event)
{
	// PINCH ZOOM DETECTION
	if (event.touches)
	{
		if (event.touches.length == 2)
		{
			var zoom;
			if (!this.zoom)
			{
				this.zoom = Math.sqrt(Math.pow(event.touches[0].clientX - event.touches[1].clientX, 2) + Math.pow(event.touches[0].clientY - event.touches[1].clientY, 2));
				zoom = Math.sqrt(Math.pow(event.touches[0].clientX - event.touches[1].clientX, 2) + Math.pow(event.touches[0].clientY - event.touches[1].clientY, 2));
			}
			else
			{
				zoom = Math.sqrt(Math.pow(event.touches[0].clientX - event.touches[1].clientX, 2) + Math.pow(event.touches[0].clientY - event.touches[1].clientY, 2));
			}
			this.dispatchEvent(DragTouch.ZOOM, {zoom:(zoom - this.zoom)});
			return false;
		}
		else if (event.touches.length >= 2)
		{
			this.end(event);
		}
	}
	
	// DETECT A MINIMUM MOVE BEOFRE FIRING THE MOVE EVENT
	if (!this.hasMove)
	{
		var x = (event.touches) ? event.touches[0].clientX : event.clientX;
		var y = (event.touches) ? event.touches[0].clientY : event.clientY;
		
		if (event.touches)
		{
			if ((x - this.startX) * (x - this.startX) + (y - this.startY) * (y - this.startY) > 100)
			{
				this.startX = x;
				this.startY = y;
				this.moveX = 0;
				this.moveY = 0;
				this.endX = this.startX;
				this.endY = this.startY;
				this.hasMove = true;
			}
		}
		else if ((x != this.startX) || (y != this.startY))
		{
			this.hasMove = true;
		}
	}
	if (!this.hasMove)
	{
		return false;
	}
	
	this.endX = (event.touches) ? event.touches[0].clientX : event.clientX;
	this.endY = (event.touches) ? event.touches[0].clientY : event.clientY;
	this.moveX = this.endX - this.startX;
	this.moveY = this.endY - this.startY;
	
	if (this.HTML_DIV)
	{
		var tmpX = (this.divX_Start + this.moveX);
		var tmpY = (this.divY_Start + this.moveY);
		
		if (this.moveFree != true)
		{
			if ((this.rightLimit != null) && (this.leftLimit != null))
			{
				tmpX = Math.min(tmpX, this.rightLimit);
				tmpX = Math.max(tmpX, this.leftLimit);
				
				this.HTML_DIV.style.left = tmpX + 'px';
			}
			if ((this.bottomLimit != null) && (this.topLimit != null))
			{
				tmpY = Math.min(tmpY, this.bottomLimit);
				tmpY = Math.max(tmpY, this.topLimit);
				
				this.HTML_DIV.style.top = tmpY + 'px';
			}
		}
		else
		{
			this.HTML_DIV.style.left = tmpX + 'px';
			this.HTML_DIV.style.top = tmpY + 'px';
		}
		this.position = {x:tmpX, y:tmpY};
		this.move = {x:tmpX - this.divX_Start, y:tmpY - this.divY_Start};
	}
	else
	{
		this.move = {x:this.moveX, y:this.moveY};
		if ((this.rightLimit != null) && (this.leftLimit != null))
		{
			this.move.x = Math.min(this.move.x, this.rightLimit);
			this.move.x = Math.max(this.move.x, this.leftLimit);
		}
		if ((this.bottomLimit != null) && (this.topLimit != null))
		{
			this.move.y = Math.min(this.move.y, this.bottomLimit);
			this.move.y = Math.max(this.move.y, this.topLimit);
		}
		this.position = this.move;
	}
	this.dispatchEvent(Event.MOVE, {clientX:this.endX, clientY:this.endY, move:this.move, position:this.position});
}

DragTouch.prototype.end = function (event)
{
	this.isActive = false;
	
	if (event.type == "touchend")
	{
		removeEventSimple(document, "touchmove", this.__moveFN);
		removeEventSimple(document, "touchend", this.__endFN);
	}
	else if (event.type == "mouseup")
	{
		removeEventSimple(document, "mousemove", this.__moveFN);
		removeEventSimple(document, "mouseup", this.__endFN);
	}
	
	var clientX = (event.touches) ? ((event.touches.length > 0) ? event.touches[0].clientX : this.endX) : event.clientX;
	var clientY = (event.touches) ? ((event.touches.length > 0) ? event.touches[0].clientY : this.endY) : event.clientY;
	event = {clientX:clientX, clientY:clientY, move:this.move, position:this.positionY};
	this.dispatchEvent(Event.STOP, event);
	
	document.getElementsByTagName("body")[0].style.userSelect = "";
	document.getElementsByTagName("body")[0].style.webkitUserSelect = "";
	document.getElementsByTagName("body")[0].style.MozUserSelect = "";
	document.getElementsByTagName("body")[0].setAttribute("unselectable", "off");
}