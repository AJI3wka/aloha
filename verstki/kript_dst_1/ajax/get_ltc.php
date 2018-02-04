<?
$xml = file_get_contents("https://www.bitstamp.net/api/v2/ticker/ltcusd/");
if(empty($xml)){
	echo '{"high": "186.99", "last": "178.25", "timestamp": "1516783549", "bid": "178.19", "vwap": "176.23", "volume": "27735.18975395", "low": "163.54", "ask": "178.79", "open": "178.09"}';
}else{
	echo $xml;
}
?>