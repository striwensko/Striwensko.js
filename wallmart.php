<?php

	if ($_GET['upc'])
	{
		$url =  'http://api.walmartlabs.com/v1/items?apiKey=gg92a94g25xvwgpk6n9rbjma&upc='.$_GET['upc'];
		$content = file_get_contents($url); 
		echo $content;
	}
	else if ($_GET['request'] == 'taxonomy')
	{
		$url = 'http://api.walmartlabs.com/v1/taxonomy?apiKey=gg92a94g25xvwgpk6n9rbjma';
		$content = file_get_contents($url); 
		echo $content;
	}
	else if ($_GET['request'] == 'trends')
	{
		$url = 'http://api.walmartlabs.com/v1/trends?apiKey=gg92a94g25xvwgpk6n9rbjma';
		$content = file_get_contents($url); 
		echo $content;
	}
	else if ($_GET['request'] == 'search')
	{
		$url = 'http://api.walmartlabs.com/v1/search?apiKey=gg92a94g25xvwgpk6n9rbjma&query=' . $_GET['query'];
		if ($_GET['categoryId'])
		{
			$url .= '&categoryId='.$_GET['categoryId'];
		}
		if ($_GET['start'])
		{
			$url .= '&start='.$_GET['start'];
		}
		if ($_GET['sort'])
		{
			$url .= '&sort='.$_GET['sort'];
		}
		if ($_GET['order'])
		{
			$url .= '&order='.$_GET['order'];
		}
		$content = file_get_contents($url); 
		echo $content;
	}
?>