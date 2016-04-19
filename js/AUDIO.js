function Audio(settings)
{
	var self = this;
	this.settings = settings;
	this.duration = 0;
	this.progress = 0;
	this.audio = document.createElement('audio');
	this.audio.ontimeupdate  = function()
	{
		self.time = this.currentTime;
		self.dispatchEvent(Event.CHANGE);
	}
	this.audio.onprogress = function(event)
	{
		if (!isNaN(this.duration))
		{
			self.duration = this.duration;
		}
		if (this.buffered.length > 0)
		{
			self.progress = this.buffered.end(this.buffered.length - 1) / this.duration;
			//console.log(this.buffered.end(this.buffered.length - 1));
		}
		self.dispatchEvent('loadProgress');
		//console.log(event, this.duration);
	}
	this.gain = settings.gain || 1;

	this.loop = (settings.loop > 0) ? settings.loop : false;

	this.m4a = !!(this.audio.canPlayType && this.audio.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
	this.mp3 = !!(this.audio.canPlayType && this.audio.canPlayType('audio/mpeg;').replace(/no/, ''));
	this.ogg = !!(this.audio.canPlayType && this.audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));

	//alert("this.mp3:" + this.mp3 + "\nthis.ogg:" + this.ogg + "\n" + "this.m4a:" + this.m4a);
	this.url = '';
	if (this.mp3 && settings.mp3)
	{
		this.url = settings.mp3;
	}
	else if (this.ogg && settings.ogg)
	{
		this.url = settings.ogg;
	}
	else if (this.m4a && settings.m4a)
	{
		this.url = settings.m4a;
	}
	//alert(settings.src + this.ext);
	this.audio.src = this.url;
	this.audio.load();
	this.disable = false;

	this.volume = settings.volume || 0.5;
	this.audio.volume = this.volume * this.gain;

	this.status = Audio.STOP;
	this.isReady = false;

	addEvent(this.audio, 'canplaythrough', function(event){self.ready(event)});
	addEvent(this.audio, 'ended', function(event){self.onEnd(event)});
	ADD_EVENT_DISPACTHER(this);
}
Audio.prototype.getTimeString = function()
{
	var time = Math.floor(this.time);
	var seconds = time % 60;
	var minutes = Math.floor(time / 60);
	seconds = ((seconds < 10) ? '0' : '') + seconds;
	minutes = ((minutes < 10) ? '0' : '') + minutes;

	return minutes + ':' + seconds;
}
Audio.prototype.getTime = function()
{
	return this.time;
}
Audio.PLAY = 'PLAY';
Audio.PAUSE = 'PAUSE'
Audio.STOP = 'STOP';
Audio.prototype.ready = function(event)
{
	this.isReady = true;
	this.dispatchEvent('ready');
}
Audio.prototype.onEnd = function(event)
{
	//console.log(event);
	//alert("end");
	//alert("end" + this.settings.loop +  this.disable)
	if (this.loop && (this.status == Audio.PLAY))
	{
		var self = this;
		this.timeout = setTimeout(function(){self.play()}, this.loop);
	}
	else
	{
		this.status = Audio.STOP;
	}
	this.dispatchEvent(Event.COMPLETE);
	this.dispatchEvent(Event.STATE_CHANGE);
}
Audio.prototype.getVolume = function()
{
	return this.volume;
}
Audio.prototype.setVolume = function(value)
{
	this.volume = value;
	this.audio.volume = this.volume * this.gain;
}

Audio.prototype.play = function()
{
	this.audio.play();
	this.status = Audio.PLAY;
	this.dispatchEvent(Event.STATE_CHANGE);
}
Audio.prototype.pause = function()
{
	this.audio.pause();
	this.status = Audio.PAUSE;
	this.dispatchEvent(Event.STATE_CHANGE);

}
Audio.prototype.stop = function()
{
	this.audio.pause();
	if (this.isReady)
	{
		this.audio.currentTime = 0;
	}
	clearTimeout(this.timeout);
	this.status = Audio.STOP;
}

