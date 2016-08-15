/*
 *	STRIWENSKO LIBRARY HTML ELEMENT CLASS
 *  v 1.2
 */
Object.extend = function(destination, source)
{
    for (var property in source)
        destination[property] = source[property];
    return destination;
};



Event = {};

/**
*	@event Event#ERROR
*	@type {object}
*	@property {string} type The value of the type is Event.ERROR
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.ERROR = 'error';
/**
*	@event Event#CANCEL
*	@type {object}
*	@property {string} type The value of the type is Event.CANCEL
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CANCEL = "cancel";
/**
*	@event Event#OPEN
*	@type {object}
*	@property {string} type The value of the type is Event.OPEN
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.OPEN = "open";
/**
*	@event Event#CLOSE
*	@type {object}
*	@property {string} type The value of the type is Event.CLOSE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CLOSE = 'close';
/**
*	@event Event#COMPLETE
*	@type {object}
*	@property {string} type The value of the type is Event.COMPLETE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.COMPLETE = "onComplete";
/**
*	@event Event#CHANGE
*	@type {object}
*	@property {string} type The value of the type is Event.CHANGE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.CHANGE = "onChange";
/**
*	@event Event#MOVE
*	@type {object}
*	@property {string} type The value of the type is Event.MOVE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.MOVE = "MOVE";
/**
*	@event Event#START
*	@type {object}
*	@property {string} type The value of the type is Event.START
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.START = "START";
/**
*	@event Event#STOP
*	@type {object}
*	@property {string} type The value of the type is Event.STOP
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.STOP = "STOP";
/**
*	@event Event#RESIZE
*	@type {object}
*	@property {string} type The value of the type is Event.RESIZE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.RESIZE = "resize";
/**
*	@event Event#SELECT
*	@type {object}
*	@property {string} type The value of the type is Event.SELECT
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.SELECT = "select";
/**
*	@event Event#RENDER
*	@type {object}
*	@property {string} type The value of the type is Event.RENDER
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.RENDER = "render";
/**
*	@event Event#REFRESH
*	@type {object}
*	@property {string} type The value of the type is Event.REFRESH
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.REFRESH = "refresh";
/**
*	@event Event#STATE_CHANGE
*	@type {object}
*	@property {string} type The value of the type is Event.STATE_CHANGE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.STATE_CHANGE = "stateChange";
/**
*	@event Event#SOUND_COMPLETE
*	@type {object}
*	@property {string} type The value of the type is Event.SOUND_COMPLETE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.SOUND_COMPLETE = "soundComplete";
/**
*	@event Event#FOCUS_OUT
*	@type {object}
*	@property {string} type The value of the type is Event.FOCUS_OUT
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.FOCUS_OUT = "focusOut";
/**
*	@event Event#FOCUS_IN
*	@type {object}
*	@property {string} type The value of the type is Event.FOCUS_IN
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.FOCUS_IN = "focusIn";
/**
*	@event Event#REMOVE
*	@type {object}
*	@property {string} type The value of the type is Event.REMOVE
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.REMOVE = 'remove';
/**
*	@event Event#PROGRESS
*	@type {object}
*	@property {string} type The value of the type is Event.PROGRESS
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.PROGRESS = 'progress';
/**
*	@event Event#UPLOAD
*	@type {object}
*	@property {string} type The value of the type is Event.UPLOAD
*	@property {object} currentTarget The object which the listener was added to.
*	@property {object} data On some cases the object that emits the event might add some data to the event
*/
Event.UPLOAD = 'upload';


/*
 *	DOCUMENT SIZE 
 */


var DIMS = {};

function readSize()
{
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number')
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
    else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
    {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    else if (document.body && (document.body.clientWidth || document.body.clientHeight))
    {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    //alert( 'Width = ' + myWidth + ', Height = ' + myHeight + "." + f_clientWidth() + "." + f_clientHeight());
    DIMS.width = myWidth;
    DIMS.height = myHeight;
    //alert(DIMS.width + "x" + DIMS.height);
}


function easing(startVal, endVal, speed, maxVal, minVal, round)
{
    if (startVal == endVal)
    {
        return 0;
    }
    minVal = isNaN(minVal) ? 1 : minVal;
    var easingVal = (endVal - startVal) / speed;
    if (round)
    {
        easingVal = (startVal < endVal) ? Math.ceil(easingVal) : Math.floor(easingVal);
    }

    if (Math.abs(easingVal) < minVal)
    {
        if (Math.abs(startVal - endVal) > minVal)
        {
            return (endVal > startVal) ? minVal : -minVal;
        }
        else
        {
            return (endVal - startVal);
        }
    }
    return (startVal < endVal) ? Math.min(easingVal, maxVal) : Math.max(easingVal, -maxVal);
}


function addEvent(obj, evt, fn)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent)
    {
        obj.attachEvent('on' + evt, fn);
    }
}

function removeEvent(obj, evt, fn)
{
    if (obj.removeEventListener)
    {
        obj.removeEventListener(evt, fn, false);
    }
    else if (obj.detachEvent)
    {
        obj.detachEvent('on' + evt, fn);
    }
}
addEventSimple = addEvent;
removeEventSimple = removeEvent;

function RESIZE_DIMS(width, height, areaWidth, areaHeigth, mode, align, resizeSmallImages)
{
    var c_w = width;
    var c_h = height;

    // Desired Width and Heigth 
    var d_w = areaWidth;
    var d_h = areaHeigth;

    // New Width and Height
    var n_h = c_h;
    var n_w = c_w;

    if (mode == "VIEW_ALL")
    {
        //Code to place image to the maximum size to view all
        n_h = d_h;
        n_w = c_w * d_h / c_h;
        if (n_w > d_w)
        {
            n_h = c_h * d_w / c_w;
            n_w = d_w;
        }
    }
    if (mode == "FILL_ALL")
    {
        //Code to make image cover all size
        n_h = d_h;
        n_w = c_w * d_h / c_h;
        if (n_w < d_w)
        {
            n_h = c_h * d_w / c_w;
            n_w = d_w;
        }
    }

    if (resizeSmallImages == false)
    {
        if ((n_w > c_w) || (n_h > c_h))
        {
            n_h = c_h;
            n_w = c_w;
        }
    }

    n_w = Math.round(n_w);
    n_h = Math.round(n_h);

    var n_x = -Math.round((n_w - d_w) / 2);
    var n_y = -Math.round((n_h - d_h) / 2);

    var pos_str = align || 'C';
    if (pos_str.slice(0, 1) == "T")
    {
        n_y = 0;
    }
    if (pos_str.slice(0, 1) == "B")
    {
        n_y = d_h - n_h;
    }
    if (pos_str.slice(0, 1) == "L" || pos_str.slice(1, 2) == "L")
    {
        n_x = 0;
    }
    if (pos_str.slice(0, 1) == "R" || pos_str.slice(1, 2) == "R")
    {
        n_x = d_w - n_w;
    }

    return {
        width: n_w,
        height: n_h,
        x: n_x,
        y: n_y
    };
}

/**
 *	EVENT DISPATCHER, this class implements an event dispatcher which can be added to any object via ADD_EVENT_DISPATCHER(object) global function
 *	@class
 *	@see {@link https://jsfiddle.net/oxmtu5hn/2/} Tabs Bar demo
 *	@see {@link https://jsfiddle.net/k1v4g5rw/3/} Slider Demo
*	@see {@link https://jsfiddle.net/7hsq25n1/}   Checkbox
 *  @see {@link https://jsfiddle.net/3fvc6u0h/2/} Dropdown Demo
 *	@see {@link https://jsfiddle.net/skx8px2z/8/} Radio Button Demo
 *  @see {@link https://jsfiddle.net/gantp3pv/4/} TextField
 *  @see {@link https://jsfiddle.net/ktahn5ww/1/} Numeric Input
 */
//Label, ImageUploader, Calendar, Hidden, TextArea 
var Event_Dispatcher = {}
//https://jsfiddle.net/xkn7xhfn/
/**
*	This function Implements the event dispatcher functions on any object you send in.
*	YOu can call this inside a class you create so all instances of that class are able to dispatchEvents.
*	This is how is currently set up on the JSON_Loader, TimeLine and DragTouch class.
*	@see {Event_Dispatcher}
*/
function ADD_EVENT_DISPATCHER(element)
{
    Object.extend(element, Event_Dispatcher);
}
Event_Dispatcher.all = function(array)
{
	
}
/**
*	Adds an event listener to the object
*	@param {string} type The type of event you want to listen to.
*	@param {function | string} listener The function or name of the function you want to call when the event you are listening is dispatched
*	@param {object} scope The object on which the listener function will be called
*/
Event_Dispatcher.addEventListener = function(type, listener, scope)
{
    if (!this.events)
    {
        this.events = {};
    }
    if (!this.events[type])
    {
        this.events[type] = new Array();
    }
	scope = (scope ? scope : this);
    this.events[type].push(
    {
        listener: listener,
        scope: scope
    });
}

/**
*	Dispatchs and event, which means that listener that were added for the type being dispatched will fire
*	@param {string} type The type of event to fire
*	@param {object} data The data that will be attached to the event, the objects listening will get this data via event.data
*/
Event_Dispatcher.dispatchEvent = function(type, data)
{
    if (!this.events)
    {
        this.events = {};
    }
    if (this.events[type])
    {
        var events = this.events[type];
        for (var iEvent = 0; iEvent < events.length; iEvent++)
        {
            var listener = events[iEvent].listener;
            var scope = events[iEvent].scope;

            if ((typeof listener).toString() == "function")
            {
                scope.eventRecieverFunction = listener;
                scope.eventRecieverFunction(
                {
                    currentTarget: this,
                    type: type,
                    data: data
                });
            }
            else
            {
                scope[listener](
                {
                    currentTarget: this,
                    type: type,
                    data: data
                });
            }
        }
    }
}
/**
*	Removes an event listener to the object
*	@param {string} type The type of event you want to stop listening to.
*	@param {function | string} listener The function or name of the function you were to call when the event is dispatched
*	@param {object} scope The object on which the listener function was being called
*/
Event_Dispatcher.removeEventListener = function(type, listener, scope)
{
    if (!this.events)
    {
        return false;
    }
    if (!this.events[type])
    {
        return false;
    }

    var events = this.events[type];
    for (var iEvent = 0; iEvent < events.length; iEvent++)
    {
        if ((listener == events[iEvent].listener) && (scope == events[iEvent].scope))
        {
            events.splice(iEvent, 1);
        }
    }
}


Event_Dispatcher._addEventListener = Event_Dispatcher.addEventListener;

Event_Dispatcher._dispatchEvent = Event_Dispatcher.dispatchEvent;

Event_Dispatcher._removeEventListener = Event_Dispatcher.removeEventListener;



/**
*	This class helps you load an image from the computer or phone of the user
*	@class
*   @fires Event:CHANGE Fires when a new image was selected by the user and is available
*/
ImageUploader = function(settings)
{
    this.fileInput = document.createElement("input");
    this.fileInput.setAttribute("type", "file");
	this.fileInput.setAttribute("accept", "image/*");
    this.fileInput.setAttribute("onchange", "this.dragUploader.processFiles(this.files)");
    this.fileInput.dragUploader = this;
    //this.fileInput.style.display = 'none';

    document.body.appendChild(this.fileInput);
    this.fileInput.style.position = 'fixed';
    this.fileInput.style.top = '-300px';

    this.upload = settings && settings.upload;

    ADD_EVENT_DISPATCHER(this);
}
/**
*	Call this to open dialog for selecting a file from the computer or the phone
*	@param {event} event This event must be a dom click event to work on all browsers and devices
*/
ImageUploader.prototype.browse = function(event)
{
    console.log(event);
    this.fileInput.click(event);
}

ImageUploader.prototype.imageReady = function(fileData, fileName)
{
    this.data = fileData;
    console.log("fileName", fileName);
    this.dispatchEvent(Event.COMPLETE,
    {
        fileName: fileName
    });

    this.fileInput.setAttribute("onchange", "");
    this.fileInput.dragUploader = null;
    document.body.removeChild(this.fileInput);

    this.fileInput = document.createElement("input");
    this.fileInput.setAttribute("type", "file");
    this.fileInput.setAttribute("onchange", "this.dragUploader.processFiles(this.files)");
    this.fileInput.dragUploader = this;

    document.body.appendChild(this.fileInput);
    this.fileInput.style.position = 'fixed';
    this.fileInput.style.top = '-300px';
}
ImageUploader.prototype.onProgress = function(event)
{
    this.progress = event.loaded / event.total;
    this.dispatchEvent(Event.PROGRESS)
}
ImageUploader.prototype.startUpload = function(f)
{
    if (this.upload)
    {
        var self = this;
        var data = new FormData();
        data.append('file', f);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (request.readyState == 4)
            {
                if (request.status == 200)
                {
                    try
                    {
                        var json = JSON.parse(this.responseText);
                        self.dispatchEvent(Event.UPLOAD, json);
                    }
                    catch (e)
                    {
                        self.dispatchEvent(Event.UPLOAD);
                    }
                }

            }
        };
        request.upload.addEventListener('progress', function(event)
        {
            self.onProgress(event);
        }, false);
        request.open('POST', this.upload);
        request.send(data);
    }
}
ImageUploader.prototype.processFiles = function(files)
{
    //console.log('file:', this.fileInput);
    // files is a FileList of File objects. List some properties.
    var f = files[0];
    //console.log(files);
    if (f)
    {

        //console.log(f);
        var fileName = f.name;
        var ext = fileName.split(/\./).pop().toLowerCase();

        //console.log((typeof FileReader !== "undefined"), ext, FileReader);
        if (((ext == 'png') || (ext == 'jpg') || (ext == 'gif') || (ext == 'jpeg')) && (typeof FileReader !== "undefined"))
        {
            var self = this;
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = function(e)
            {
                self.startUpload(f);
                self.imageReady(e.target.result, fileName);

            };

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
    //document.getElementById('msg').innerHTML = ;
}