<?php
header("Content-type: text/css; charset: UTF-8");
require_once('../include/ls_account.php');
$ls_account = new LSAccount();
$client_dir = $ls_account->getClientDirectory();
if(!@include("../../{$client_dir}/les_config.php")) exit;

$conn = mysqli_connect($dbendpoint,$username,$password,$database);
if (mysqli_connect_errno()){
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$query = "call get_client_custom_css({$client_id},{$agent_id});";

$result = $conn->query($query, MYSQLI_STORE_RESULT);
$row = $result->fetch_assoc();
if($row){
	if(!empty($row['prim_color'])){
		echo('#navMenu ul li{
			background:#'.$row['prim_color'].';
		}');
		echo('.bootstrap-switch-info{
			background-color:#'.$row['prim_color'].';
		}');
		echo('.bootstrap-switch-on .bootstrap-switch-info ~ .bootstrap-switch-handle-off{
			box-shadow: inset 16px 0 0 #'.$row['prim_color'].';
		}');
		echo('.bootstrap-switch-info ~ .bootstrap-switch-handle-off:before{
			border-color:#'.$row['prim_color'].';
		}');
	}
	if(!empty($row['button_color'])){
		echo('.btn-info{background-color:#'.$row['button_color'].';}');
		echo('.btn-info:hover{background-color:#'.colourBrightness($row['button_color'],0.5).';}');
		
	}
	if(!empty($row['sec_button_color'])){
		echo('.btn-primary{background-color:#'.$row['sec_button_color'].';}');
		echo('.btn-primary:hover{background-color:#'.colourBrightness($row['sec_button_color'],0.5).';}');
	}
	if(!empty($row['background_color'])){
		echo('#holder{background:#'.$row['background_color'].';}');
	}
}
$result->free();
$conn->next_result();

function colourBrightness($hex, $percent) {
	// Work out if hash given
	$hash = '';
	if (stristr($hex,'#')) {
		$hex = str_replace('#','',$hex);
		$hash = '#';
	}
	/// HEX TO RGB
	$rgb = array(hexdec(substr($hex,0,2)), hexdec(substr($hex,2,2)), hexdec(substr($hex,4,2)));
	//// CALCULATE 
	for ($i=0; $i<3; $i++) {
		// See if brighter or darker
		if ($percent > 0) {
			// Lighter
			$rgb[$i] = round($rgb[$i] * $percent) + round(255 * (1-$percent));
		} else {
			// Darker
			$positivePercent = $percent - ($percent*2);
			$rgb[$i] = round($rgb[$i] * $positivePercent) + round(0 * (1-$positivePercent));
		}
		// In case rounding up causes us to go to 256
		if ($rgb[$i] > 255) {
			$rgb[$i] = 255;
		}
	}
	//// RBG to Hex
	$hex = '';
	for($i=0; $i < 3; $i++) {
		// Convert the decimal digit to hex
		$hexDigit = dechex($rgb[$i]);
		// Add a leading zero if necessary
		if(strlen($hexDigit) == 1) {
		$hexDigit = "0" . $hexDigit;
		}
		// Append to the hex string
		$hex .= $hexDigit;
	}
	return $hash.$hex;
}
?>