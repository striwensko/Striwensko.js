<?php
$url = 'https://books.zoho.com/api/v3/contacts';

if ($_GET['request'] == 'LIST')
{
	$url = 'https://books.zoho.com/api/v3/contacts?authtoken=d5e11814e131c9fdf2f9c5ce1f7cd0ed&organization_id=629717545';
	$content = file_get_contents(rawurldecode($url)); 
	echo $content;
}
else if ($_GET['request'] == 'GET')
{
	$url = 'https://books.zoho.com/api/v3/contacts/'. $_GET['id'] .'?authtoken=d5e11814e131c9fdf2f9c5ce1f7cd0ed&organization_id=629717545';
	$content = file_get_contents(rawurldecode($url)); 
	echo $content;
}
else if ($_GET['request'] == 'PUT')
{
	$data = array(
		'authtoken' => 'd5e11814e131c9fdf2f9c5ce1f7cd0ed',
		'JSONString' => '{
		"payment_terms" => 15, 
		"payment_terms_label" => "Net 15",
		"contact_name" => "'.$_POST['contact_name'].'",
		"company_name" => "'.$_POST['company_name'].'",
		"website" => "'.$_POST['website'].'",
		
		}',
		// "phone" => "'.$_POST['phone'].'"
		"organization_id" => '629717545'
	);
	
	$curl = curl_init('https://books.zoho.com/api/v3/contacts/'.$_GET['id']);

	curl_setopt_array($curl, array(
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_RETURNTRANSFER => true
	));
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");

	$result = curl_exec($curl);

	echo ($result);
}
else if ($_GET['request'] == 'DELETE')
{
	$data = array(
		'authtoken' => 'd5e11814e131c9fdf2f9c5ce1f7cd0ed',
		'JSONString' => '{
		"id" => "'.$_GET['id'].'",
		}',
		"organization_id" => '629717545'
	);
	echo 'https://books.zoho.com/api/v3/contacts/'.$_GET['id'].'?authtoken=d5e11814e131c9fdf2f9c5ce1f7cd0ed&organization_id=629717545';
	$curl = curl_init('https://books.zoho.com/api/v3/contacts/'.$_GET['id'].'?authtoken=d5e11814e131c9fdf2f9c5ce1f7cd0ed&organization_id=629717545');

	curl_setopt_array($curl, array(
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_RETURNTRANSFER => true
	));
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");

	$result = curl_exec($curl);

	echo ($result);
}
else if ($_GET['request'] == 'POST')
{
	$data = array(
		'authtoken' => 'd5e11814e131c9fdf2f9c5ce1f7cd0ed',
		'JSONString' => '{
		"payment_terms" => 15, 
		"payment_terms_label" => "Net 15",
		"contact_name" => "'.$_POST['contact_name'].'",
		"company_name" => "'.$_POST['company_name'].'",
		"website" => "'.$_POST['website'].'",
		
		}',
		// "phone" => "'.$_POST['phone'].'"
		"organization_id" => '629717545'
	);
	
	$curl = curl_init($url);

	curl_setopt_array($curl, array(
		CURLOPT_POST => 1,
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_RETURNTRANSFER => true
	));

	$result = curl_exec($curl);
	echo ($result);
}
else
{
	$data = array(
		'authtoken' => 'd5e11814e131c9fdf2f9c5ce1f7cd0ed',
		'JSONString' => '{"contact_name" => "Bowman and Co", "payment_terms" => 15, 
		"payment_terms_label" => "Net 15"}',
		"organization_id" => '629717545'
	);

	$curl = curl_init($url);

	curl_setopt_array($curl, array(
		CURLOPT_POST => 1,
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_RETURNTRANSFER => true
	));

	$result = curl_exec($curl);
/*"{"contact_name":"Eizen","company_name":"Sears","website":"sears.com","contact_type":"customer","currency_id":"335629000000044013","payment_terms":15,"payment_terms_label":"Net+15","pricebook_id":"","notes":"","billing_address":{"address":"","city":"","state":"","zip":"","country":"","fax":"","is_update_customer":false},"shipping_address":{"address":"","city":"","state":"","zip":"","country":"","fax":"","is_update_customer":false},"contact_persons":[{"contact_person_id":"335629000000047009","first_name":"","last_name":"","mobile":"","phone":"","email":"juan@gmail.co","salutation":"","is_primary_contact":true,"skype":""}],"default_templates":{"estimate_template_id":"","invoice_template_id":"","creditnote_template_id":"","purchaseorder_template_id":"","salesorder_template_id":"","retainerinvoice_template_id":"","paymentthankyou_template_id":"","retainerinvoice_paymentthankyou_template_id":"","estimate_email_template_id":"","invoice_email_template_id":"","creditnote_email_template_id":"","purchaseorder_email_template_id":"","salesorder_email_template_id":"","retainerinvoice_email_template_id":"","paymentthankyou_email_template_id":"","retainerinvoice_paymentthankyou_email_template_id":""},"is_portal_enabled":false,"owner_id":"","language_code":"en","twitter":"","facebook":""}"
*/
	var_dump($result);
	
}

?>
