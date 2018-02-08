<?
$xml = file_get_contents("https://www.bitstamp.net/api/v2/ticker/ethusd/");
if(empty($xml)){
	echo '{"high": "1024.98", "last": "1000.00", "timestamp": "1516783549", "bid": "1000.00", "vwap": "972.43", "volume": "53007.44524938", "low": "905.00", "ask": "1000.20", "open": "987.56"}';
}else{
	echo $xml;
}
?>