/**
 * This class can load json files, the request can go via post or get.
 * @class
 * @see {@link https://jsfiddle.net/9ph3x41e/4/} Load the 30 most popular project on github for javascript
*/
function JSON_Loader()
{
	this.request;
	this.url;
	this.isReady = false;
	ADD_EVENT_DISPATCHER(this);
}
JSON_Loader.prototype.abort = function ()
{
	if (this.request)
	{
		this.request.abort();
	}
}
JSON_Loader.prototype.send = function(data)
{
	this.load(data.url, data.data, data.contentType || null, data.requestMethod || null, data.headers || null);
}
/**
*	Use to load a json
*	@param {string} url The url to the json file we are trying to load
*	@param {obect | string} parameters The parameters can be a string or an object that depend on your contentType and the webservice you are using usually use string format like name=Juan&last=Arias the default contentType is "application/x-www-form-urlencoded"
*	@param {string} contentType The contentType attach to the request the default value is "application/x-www-form-urlencoded"
*/
JSON_Loader.prototype.load = function (url, parameters, contentType, requestMethod, headers)
{
		this.url = url;
		this.data = null;
		this.isReady = false;
		
		var self = this;

		if (this.request)
		{
			this.request.abort();
		}
        if (window.XMLHttpRequest)
		{ // Mozilla, Safari, ...
            this.request = new XMLHttpRequest();
            if (this.request.overrideMimeType)
			{
                this.request.overrideMimeType('text/xml');
                // See note below about this line
            }
        } 
		else if (window.ActiveXObject) 
		{ // IE
            try
			{
                this.request = new ActiveXObject("Msxml2.XMLHTTP");
            }
			catch (e)
			{
                try 
				{
                    this.request = new ActiveXObject("Microsoft.XMLHTTP");
                }
				catch (e) 
				{
				}
            }
        }

        

        if (!this.request)
		{
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
		
		this.request.onreadystatechange = function(event)
		{
			var error = false;
			var request = event.target;
			var readyState = request.readyState;
			var isComplete = false;
			
			//console.log(readyState, request.status)
			if (readyState == 4)
			{
				if ((request.status == 400))
				{
					//console.log(this);
					try
					{
						var string = unescape(escape(this.responseText).replace(/%0A/gim, '').replace(/%0D/gim, ''));
						//console.log(string)
						self.data = JSON.parse(string);
						self.dispatchEvent(Event.ERROR);
					}
					catch(e)
					{
						console.log(e);
						self.dispatchEvent(Event.ERROR);
					}
				}
				else if ((request.status == 200) || ((window.location.protocol === "file:") && (request.status == 0)))
				{
					try
					{
						var string = unescape(escape(this.responseText).replace(/%0A/gim, '').replace(/%0D/gim, ''));
						self.data = JSON.parse(string);
					}
					catch(e)
					{
						error = true;
					}
					
					if (!error)
					{
						self.isReady = true;
						self.dispatchEvent(Event.COMPLETE);
					}
					else
					{
						console.log('error:' + self.url + ',' + error);
						console.log("string:" + (string));
						self.dispatchEvent(Event.CANCEL);
					}


				}
			}
			
		};
        if (parameters)
		{
			this.request.open(requestMethod || "POST", this.url, true)
			if (contentType)
			{
				this.request.setRequestHeader("Content-Type", contentType);
			}
			else
			{
				this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
			}
			
			if (headers)
			{
				for (var iHeader = 0; iHeader < headers.length; iHeader++)
				{
					console.log(headers[iHeader].name, headers[iHeader].value)
					this.request.setRequestHeader(headers[iHeader].name, headers[iHeader].value);
				}
			}
			
			this.request.send(parameters)
		}
		else
		{
			this.request.open(requestMethod || 'GET', this.url, true);
			if (contentType)
			{
				this.request.setRequestHeader("Content-Type", contentType);
			}
			
			if (headers)
			{
				for (var iHeader = 0; iHeader < headers.length; iHeader++)
				{
					this.request.setRequestHeader(headers[iHeader].name, headers[iHeader].value);
				}
			}
	        this.request.send(null);	
		}
}