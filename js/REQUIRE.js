var Require = function(url, dependencies, fn, progressFN)
{
    Require.addItem(url, dependencies, fn, progressFN);
};
Require.length = 0;
Require.dictionary = {};
Require.queue = [];
Require.loading = [];
Require.loaded = 0;
Require.SIZE = 3;
Require.onReady = function(){}
Require.images = {};
Require.start = function()
{
    if (!Require.loader)
    {
        Require.loader = document.createElement('div');
        Require.loader.className = 'app-loader'

        Require.loader.barHolder = document.createElement('div');
        Require.loader.barHolder.className = 'bar-holder'
        Require.loader.appendChild(Require.loader.barHolder);

        Require.loader.bar = document.createElement('div');
        Require.loader.bar.className = 'bar';
        Require.loader.barHolder.appendChild(Require.loader.bar);
    }
    Require.next();
    //console.log(Require.length);
}
Require.updateLoader = function()
{
    var pct = Require.loaded / Require.length;
    Require.loader.bar.style.width = (100 * pct) + '%';
}
Require.next = function()
{
    //console.log("next")
    for (var iQueue = 0; iQueue < this.queue.length; iQueue++)
    {
        var items = this.queue[iQueue].items;
        for (var iItem = items.length - 1; iItem >= 0; iItem--)
        {
            if (!this.isLoading(items[iItem]) && !this.hasBranches(items[iItem]))
            {
                this.load(items[iItem]);
                if (this.loading.length < Require.SIZE )
                {
                    this.next();
                }
                return true;
            }
            // load leaf
        }
        if (items.length == 0 && !this.isLoading(this.queue[iQueue].url))
        {
            this.load(this.queue[iQueue].url);
            if (this.loading.length < Require.SIZE )
            {
                this.next();
            }
            return true;
        }
        // load parent
    }
    return false;
}
Require.hasBranches = function(url)
{
    for (var iQueue = 0; iQueue < this.queue.length; iQueue++)
    {
        if (this.queue[iQueue].url == url)
        {
            return true;
        }
    }
    return false;
}
Require.isLoading = function(url)
{
    for (var iLoading = 0; iLoading < this.loading.length; iLoading++)
    {
        if (this.loading[iLoading] == url)
        {
            return true;
        }
    }
    return false;
}
Require.load = function(url)
{
    //console.log('loading ' + url)
    if (url.split('.png').length > 1 || url.split('.jpg').length > 1 || url.split('.jpeg').length > 1 || url.split('.gif').length > 1 || url.split('.svg').length > 1)
    {
        this.loadImage(url);
    }
    else if (url.split('.js').length > 1)
    {
        this.loadJs(url);
    }
    else if (url.split('.css').length > 1)
    {
        this.loadCss(url);
    }   
}
Require.loadImage = function(url)
{
    console.log("image", url)
    var copyURL = url;
    if (copyURL.split('?').length > 1)
    {
        copyURL += '&time=' + new Date().getTime();
    }
    else
    {
        copyURL += '?time=' + new Date().getTime();
    }
    
    var image = new Image();
    image.src = copyURL;
    image.onload = function () {
        console.log("load", url)
        Require.onload(this, url);
    }
    image.onerror = function () {
        Require.onload(this, url);
    }
    Require.images[url] = image;
    Require.loading.push(url);
}
Require.getImage = function(url)
{
    return Require.images[url];
}
Require.loadJs = function(url)
{
    var copyURL = url;
    if (copyURL.split('?').length > 1)
    {
        copyURL += '&time=' + new Date().getTime();
    }
    else
    {
        copyURL += '?time=' + new Date().getTime();
    }
    
    var script = document.createElement('script');
    script.setAttribute('src', copyURL);
    script.setAttribute('type', 'text/javascript');
    script.onload = function () {
        Require.onload(this, url);
    }
    script.onerror = function () {
        Require.onload(this, url);
    }
    
    document.head.appendChild(script);
    
    Require.loading.push(url);
}
Require.loadCss = function(url)
{
    var copyURL = url;
    if (copyURL.split('?').length > 1)
    {
        copyURL += '&time=' + new Date().getTime();
    }
    else
    {
        copyURL += '?time=' + new Date().getTime();
    }
    
    var css = document.createElement('link');
    css.setAttribute('href', copyURL);
    css.setAttribute('rel', 'stylesheet');
    css.onload = function () {
        Require.onload(this, url);
    }
    css.onerror = function () {
        Require.onload(this, url);
    }
    document.head.appendChild(css);
    
    Require.loading.push(url);
}
Require.onload = function (node, url)
{
    //console.log('loaded -->' + url)
    this.dictionary[url].load = true;
    for (var iLoading = this.loading.length - 1; iLoading >= 0; iLoading--)
    {
        if (this.loading[iLoading] == url)
        {
            this.loading.splice(iLoading, 1);
        }
    }
    for (var iQueue = this.queue.length - 1; iQueue >= 0; iQueue--)
    {
        if (this.queue[iQueue].url == url)
        {
            if (this.queue[iQueue].fn && this.queue[iQueue].fn.constructor == Function)
            {
                this.queue[iQueue].loaded++;
                this.queue[iQueue].progress && this.queue[iQueue].progress(this.queue[iQueue].loaded / this.queue[iQueue].length);
                this.queue[iQueue].fn();
            }
            this.queue.splice(iQueue, 1);
        }
        else
        {
            var items = this.queue[iQueue].items;
            console.log(JSON.stringify(this.queue))
            for (var iItem = items.length - 1; iItem >= 0; iItem--)
            {
                console.log(items[iItem], url)
                if (items[iItem] == url)
                {
                    this.queue[iQueue].loaded++;
                    this.queue[iQueue].progress && this.queue[iQueue].progress(this.queue[iQueue].loaded / this.queue[iQueue].length);
                    items.splice(iItem, 1);
                }
            }
        }
    }
    Require.next();
    Require.loaded++;
    Require.updateLoader();
}
Require.addItem = function(url, dependencies, fn, progressFN)
{
    dependencies = dependencies || [];
    if (!this.dictionary[url])
    {
        Require.length++;
    }
    this.dictionary[url] = {load:false, items:dependencies, length:dependencies.length + 1};
    for (var iDependency = 0; iDependency < dependencies.length; iDependency++)
    {
        if (!this.dictionary[dependencies[iDependency]])
        {
            Require.length++;
            this.dictionary[dependencies[iDependency]] = {load:false, items:[]};
        }
    }
    Require.queue.push({url:url, items:dependencies, fn:(fn), progress:progressFN, loaded:0, length:dependencies.length + 1});
}