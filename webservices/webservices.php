<?php

$servername = "mysql51-081.wc1.ord1.stabletransit.com";
$username = "340031_orossus";
$password = "Carrot12!";
$dbname =   "340031_orossju";

// Create connection
$conn = mysql_connect($servername, $username, $password);
if (!$conn)
{
	die("Connection failed: " . $conn->connect_error);
}

mysql_select_db($dbname);
$method = $_SERVER['REQUEST_METHOD'];


$url = (($_GET['url']) ? $_GET['url'] : 'users');
preg_match("/^users\/(.{1,})$/", $url, $output_array);
if ($output_array[1])
{
	$id = $output_array[1];
}
$model = ['name', 'apellidoP', 'id'];


if ($method == 'DELETE' && $id)
{
	$sql = "DELETE FROM user WHERE id=".$id;
	$result = mysql_query($sql);
	echo '{"sucess":true}';
}
else if ($method == 'PUT')
{
	$DATA = get_object_vars(json_decode(file_get_contents('php://input')));
	$update = '';
	
	$quote = '"';
	for ($iProperty = 0; $iProperty < count($model); $iProperty++)
	{
		if ($model[$iProperty] == 'id')
		{
			continue;
		}
		$value = $DATA[$model[$iProperty]];
		$property = $model[$iProperty];
		$update = $update . (($update == '') ? '' : ', ') . $property . '=' . $quote . $value . $quote;
	}
	
	$sql = "UPDATE user SET ".$update. " WHERE id = ". $id;
	$result = mysql_query($sql);
	echo '{"sucess":true, data:{"id":'.mysql_insert_id($conn).'}}';
}
else if ($method == 'GET')
{
	if ($id)
	{
		$sql = "SELECT * FROM user WHERE id=".$id;
		echo $sql;
		echo GET_OBJECT($sql, $model);
	}
	else
	{
		$sql = "SELECT * FROM user";
		echo $sql;
		echo GET_LIST($sql, $model);
		
	}
}
else if ($method == 'POST')
{
	$DATA = get_object_vars(json_decode(file_get_contents('php://input')));
	
	
	$values = '';
	$properties = '';
	
	$quote = '"';
	for ($iProperty = 0; $iProperty < count($model); $iProperty++)
	{
		if ($model[$iProperty] == 'id')
		{
			continue;
		}
		$values = $values . (($values == '') ? '' : ', ') . $quote .  $DATA[$model[$iProperty]] . $quote;
		$properties = $properties . (($properties == '') ? '' : ', ') . $model[$iProperty];
		
	}
	
	$sql = "INSERT INTO user (".$properties.") VALUES (".$values.")";
	$result = mysql_query($sql);
	echo '{"id":'.mysql_insert_id($conn).'}';
}
/*
json.send({url:'webservices/webservices.php?url=users', requestMethod:'POST', data:JSON.stringify({name:"Kaido",apellidoP:"Rayleigh"})});
json.send({url:'webservices/webservices.php?url=users', requestMethod:'GET'});
json.send({url:'webservices/webservices.php?url=users/20', requestMethod:'GET'});
json.send({url:'webservices/webservices.php?url=users/23', requestMethod:'DELETE'});
json.send({url:'webservices/webservices.php?url=users/29', requestMethod:'PUT', data:JSON.stringify({name:"Kurosaki",apellidoP:"Ichigo"})});
*/

$conn->close();

function GET_LIST($sql, $model)
{
	$result = mysql_query($sql);
	
	$json = '[';
	
	while($row = mysql_fetch_array($result))
	{
		$json .= (($json == '[') ? '' : ',');
		$json .= '{';
		
		for ($iProperty = 0; $iProperty < count($model); $iProperty++)
		{
			$json .= (($iProperty == 0) ? '' : ',');
			$json .= '"'.$model[$iProperty].'":"'.$row[$model[$iProperty]].'"';
		}
		$json .= '}';
	}
	$json .= ']';
	return $json;
}

function GET_OBJECT($sql, $model)
{
	$result = mysql_query($sql);
	$json = '';
	
	while($row = mysql_fetch_array($result))
	{
		$json .= '{';
		for ($iProperty = 0; $iProperty < count($model); $iProperty++)
		{
			$json .= (($iProperty == 0) ? '' : ',');
			$json .= '"'.$model[$iProperty].'":"'.$row[$model[$iProperty]].'"';
		}
		$json .= '}';
	}
	
	return $json;
}
/*
$model = array(
	"read" => array(
		"path" => "user",
		"enable" => true
	),
	"write" => array(
		"path" => "user/create",
		"enable" => true
	),
	"list" => array(
		"path" => "user/list",
		"enable" => true
	),
	"table" => "user",
    "data" => array(
    	"name" => array(true, true, 'string'),
		"apellidoP" => array(true, true, 'string'),
		"apellidoM" => array(true, true, 'string'),
		"user" => array(true, true, 'string'),
		"pass" => array(true, true, 'string'),
		"id" => array(true, true, 'number'),
		"role" => array(true, true, 'number'),
		
		"address" => array(true, true, 'string'),
		"colonia" => array(true, true, 'string'),
		"mobile" => array(true, true, 'string'),
		"phone" => array(true, true, 'string'),
		"email" => array(true, true, 'string'),
		"start_date" => array(true, true, 'string'),
	)
);


$url = (($_GET['url']) ? $_GET['url'] : 'property/list');

//echo $model["write"]["path"]."_".$_GET['url'].'<br/>';
//echo 'url=>'.$url.'<br/>';

if ($model["list"]["path"] == $url)
{
	$operation = 'read';
	$DATA;
}
else if ($model["write"]["path"] == $url)
{
	$operation = 'write';
	$DATA = json_decode(file_get_contents('php://input'));
}
else if ($model["read"]["path"] == $url)
{
	$operation = 'read';
	$DATA = array();
	foreach ($_GET as $property => $value)
	{
		if ($property != 'url')
		{
			$DATA[$property] = $_GET[$property];
		}
	}
}
//$DATA = array();
//echo "p:".$operation."__".$_POST['address'];

if ($operation == 'write')
{
	//echo "w_rite";
	$values = '';
	$properties = '';
	$update = '';
	//UPDATE moduleData SET value='".$value."' WHERE id='".$param[0]."' AND param='".$param[1]."'"
	
	$id = null;
	foreach ($DATA as $property => $value)
	{
		echo $property;
		if ($property == "id")
		{
			
			if ($value != '')
			{
				$id = $value;
			}
			else
			{
				
				continue;
			}
		}
		if (!$model['data'][$property])
		{
			continue;
		}
		$quote = (($model['data'][$property][2] == 'string') ? "'" : "");
		if ($model['data'][$property][1] === true || $model['data'][$property][1] === false)
		{
			if ($model['data'][$property][1] === true)
			{
				$values = $values . (($values == '') ? '' : ', ') . $quote . $value . $quote;
				$properties = $properties . (($properties == '') ? '' : ', ') . $property;
				$update = $update . (($update == '') ? '' : ', ') . $property . '=' . $quote . $value . $quote;
			}
		}
		else if ($model['data'][$property][1]())
		{
			$values = $values . (($values == '') ? '' : ', ') . $quote . $value . $quote;
			$properties = $properties . (($properties == '') ? '' : ', ') . $property;
			$update = $update . (($update == '') ? '' : ', ') . $property . '=' . $quote . $value . $quote;
		}
	}
	
	if ($id)
	{
		$sql = "UPDATE user SET ".$update. " WHERE id = ". $id;
	}
	else
	{
		$sql = "INSERT INTO user (".$properties.") VALUES (".$values.")";
	}
	//echo "sql".$sql;
	
	$result = mysql_query($sql);
	if ($id)
	{
		echo '{"id":'.$id.'}';
	}
	else
	{
		echo '{"id":'.mysql_insert_id($conn).'}';
	}
	$conn->close();
}
else if ($operation == 'read')
{
	$properties = '';
	//UPDATE moduleData SET value='".$value."' WHERE id='".$param[0]."' AND param='".$param[1]."'"
	foreach ($model['data'] as $property => $value)
	{
		$quote = (($model['data'][$property][2] == 'string') ? "'" : "");
		if ($model['data'][$property][0] === true || $model['data'][$property][0] === false)
		{
			if ($model['data'][$property][0] === true)
			{
				$properties = $properties . (($properties == '') ? '' : ', ') . $property;
			}
		}
		else if ($model['data'][$property][0]())
		{
			$properties = $properties . (($properties == '') ? '' : ', ') . $property;
		}
	}

	$sql = "SELECT ".$properties." FROM ".$model["table"].(($DATA['id']) ? (" WHERE id = ". $DATA['id']) : "");
	$result = mysql_query($sql);
	$firstResult = true;
	if ($model["list"]["path"] == $url)
	{
		echo '[';
	}
	while($row = mysql_fetch_array($result))
	{
		if (!$firstResult)
		{
			echo ',';
		}
		$firstProperty = true;
		echo '{';
		foreach ($row as $property => $value)
		{
			if (is_int($property))
			{
				continue;
			}
			if (!$firstProperty)
			{
				echo ',';
			}
			$quote = (($model['data'][$property][2] == 'string') ? '"' : "");
			echo '"'.$property.'":'.$quote.$row[$property].$quote;
			$firstProperty = false;
		}
		echo '}';
		$firstResult = false;
	}
	if ($model["list"]["path"] == $url)
	{
		echo ']';
	}
	$conn->close();
}

*/





?>