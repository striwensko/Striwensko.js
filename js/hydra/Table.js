var HYDRA = HYDRA || {};
HYDRA.Table = function(model)
{
	var self = this;
	this.data = {};
	this.model = model;
	this.holder = document.createElement('div');
	this.holder.className = 'hydra-table';
	
	this.json = new JSON_Loader();
	this.json.addEventListener(Event.COMPLETE, 'onData', this);

	this.title = document.createElement('div');
	this.title.innerHTML = model.title;
	this.title.className = 'titleArea';
	this.holder.appendChild(this.title);
	
	this.table = document.createElement('table');
	this.table.className = 'table';
	this.holder.appendChild(this.table);

	this.header = document.createElement('tr');
	this.header.className = 'header';
	this.table.appendChild(this.header);
	
	var columns = model.columns;
	var sortButtons = [];
	for (var iCol = 0; iCol < columns.length; iCol++)
	{
		var cell = document.createElement('td');
		cell.innerHTML = columns[iCol].name;
		if (columns[iCol].sort)
		{
			var sortButton = document.createElement('i');
			sortButton.innerHTML = '&nbsp;';
			sortButton.sort = columns[iCol].sort;
			sortButton.onmousedown = function()
			{
				var sortType = 'up';
				for (var iSort = 0; iSort < sortButtons.length; iSort++)
				{
					if (self.data.sort == this.sort && (this == sortButtons[iSort]))
					{
						sortType = (self.data.order == 'asc') ? 'down' : 'up';
					}
					sortButtons[iSort].className = ((this == sortButtons[iSort]) ? sortType : '');
				}
				self.data.order = (sortType == 'up') ? 'asc' : 'desc';
				self.data.sort = this.sort;
				self.load(null, self.data);
			}
			sortButtons.push(sortButton);
			cell.appendChild(sortButton);
		}
		cell.style.textAlign = ((columns[iCol].align) ? columns[iCol].align : '');
		cell.style.width = ((columns[iCol].width) ? (columns[iCol].width + 'px') : '');
		this.header.appendChild(cell);
	}
	this.paging = document.createElement('div');
	this.paging.className = 'paging';
	this.holder.appendChild(this.paging);
}
HYDRA.Table.prototype.clear = function()
{
	var rows = this.table.children;
	for (var iRow = rows.length - 1; iRow >= 0; iRow--)
	{
		if (rows[iRow] != this.header)
		{
			this.table.removeChild(rows[iRow]);
		}
	}
}
HYDRA.Table.prototype.load = function(url, data)
{
	console.log(url || this.model.src, data);
	this.data = data || this.data;
	var url = HYDRA.Utils.buildURL(url || this.model.src, data);
	this.json.load(url);
}
HYDRA.Table.prototype.onData = function(event)
{
	var self = this;
	var columns = this.model.columns;
	var data = ((this.model.parser) ? this.model.parser(this.json.data) : this.json.data);
	var items = data.items;
	this.clear();
	if (!items)
	{
		return false;
	}
	for (var iItem = 0; iItem < items.length; iItem++)
	{
		var row = document.createElement('tr');
		row.className = 'row';
		for (var iCol = 0; iCol < columns.length; iCol++)
		{
			var cell = document.createElement('td');
			cell.style.textAlign = ((columns[iCol].align) ? columns[iCol].align : '');
			if (columns[iCol].render)
			{
				var render_html =  columns[iCol].render(items[iItem]);
				if (render_html.constructor == String)
				{
					cell.innerHTML = '<div class="text-column">' + render_html + '</div>';
				}
				else
				{
					cell.appendChild(render_html);
				}
			}
			else if (columns[iCol].id)
			{
				cell.innerHTML = '<div class="text-column">' + items[iItem][columns[iCol].id] + '</div>';
			}
			if (columns[iCol].width)
			{
				cell.style.width = columns[iCol].width + 'px';
			}
			row.appendChild(cell);
		}
		this.table.appendChild(row);
	}
	this.paging.innerHTML = '<span>Page' + (data.page + 1) + ' of ' + data.pages + '</span>';
	var previousButton = document.createElement('b');
	previousButton.className = 'fa fa-angle-left';
	previousButton.onclick = function()
	{
		self.previous(data);
	}
	this.paging.appendChild(previousButton);
	var nextButton = document.createElement('b');
	nextButton.className = 'fa fa-angle-right';
	nextButton.onclick = function()
	{
		self.next(data);
	}
	this.paging.appendChild(nextButton);
}

HYDRA.Utils = {};
HYDRA.Utils.formatNumber = function (value, settings) {
    var powerText = '';
    if (settings.power && value > 1000) {
        var power = Math.floor(Math.log(value) / Math.log(10) / 3);
        value = value / Math.pow(10, power * 3);
        if (power == 1) {
            powerText = 'K';
        }
        else if (power == 2) {
            powerText = 'M';
        }
        else if (power == 3) {
            powerText = 'B';
        }
        else if (power == 4) {
            powerText = 'T';
        }
    }


    var decimals = value % 1;
    var integer = Math.floor(value).toString();



    if (settings.addCommas) {
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(integer)) {
            integer = integer.replace(rgx, '$1' + ',' + '$2');
        }
    }


    var text = integer + ((decimals != 0) ? ('.' + decimals.toString().split('.')[1]) : '');

    if ((!isNaN(settings.decimals)) && (settings.decimals != null)) {
        if (this.decimals != 0) {
            text = integer + '.' + decimals.toFixed(settings.decimals).split('.')[1];
        }
    }

    text = ((settings.prefix) ? settings.prefix : '') + text + powerText + ((settings.suffix) ? settings.suffix : '');

    return text;
}
HYDRA.Utils.buildURL = function (url, data)
{
    var sourceParams = url.match(/{.*?}/gim) || [];
	for (var iParam = 0; iParam < sourceParams.length; iParam++)
	{
        var property = sourceParams[iParam].replace('{', '').replace('}', '');
        if (data[property])
		{
        	url = url.replace("{" + property + "}", data[property]);
        }
		else
		{
        	url = url.replace("{" + property + "}", "");
        }
    }
    return url;
}