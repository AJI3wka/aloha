<?
$xml = file_get_contents("https://www.bitstamp.net/api/v2/ticker/btcusd/");
if(empty($xml)){
	echo '{"high": "11409.87", "last": "10940.25", "timestamp": "1516783546", "bid": "10938.01", "vwap": "10743.86", "volume": "15419.65837704", "low": "9927.54", "ask": "10940.25", "open": "10848.99"}';
}else{
	echo $xml;
}
?>