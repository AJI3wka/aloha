<?
$xml = file_get_contents("http://www.cbr.ru/scripts/XML_daily.asp");
if(empty($xml)){
	echo '<?xml version="1.0" encoding="windows-1251" ?>
<ValCurs Date="24.01.2018" name="Foreign Currency Market">
<Valute ID="R01010">
	<NumCode>036</NumCode>
	<CharCode>AUD</CharCode>
	<Nominal>1</Nominal>
	<Name>������������� ������</Name>
	<Value>44,9261</Value>
</Valute>
<Valute ID="R01020A">
	<NumCode>944</NumCode>
	<CharCode>AZN</CharCode>
	<Nominal>1</Nominal>
	<Name>��������������� �����</Name>
	<Value>33,1248</Value>
</Valute>
<Valute ID="R01035">
	<NumCode>826</NumCode>
	<CharCode>GBP</CharCode>
	<Nominal>1</Nominal>
	<Name>���� ���������� ������������ �����������</Name>
	<Value>78,6940</Value>
</Valute>
<Valute ID="R01060">
	<NumCode>051</NumCode>
	<CharCode>AMD</CharCode>
	<Nominal>100</Nominal>
	<Name>��������� ������</Name>
	<Value>11,7328</Value>
</Valute>
<Valute ID="R01090B">
	<NumCode>933</NumCode>
	<CharCode>BYN</CharCode>
	<Nominal>1</Nominal>
	<Name>����������� �����</Name>
	<Value>28,5195</Value>
</Valute>
<Valute ID="R01100">
	<NumCode>975</NumCode>
	<CharCode>BGN</CharCode>
	<Nominal>1</Nominal>
	<Name>���������� ���</Name>
	<Value>35,2903</Value>
</Valute>
<Valute ID="R01115">
	<NumCode>986</NumCode>
	<CharCode>BRL</CharCode>
	<Nominal>1</Nominal>
	<Name>����������� ����</Name>
	<Value>17,6170</Value>
</Valute>
<Valute ID="R01135">
	<NumCode>348</NumCode>
	<CharCode>HUF</CharCode>
	<Nominal>100</Nominal>
	<Name>���������� ��������</Name>
	<Value>22,2662</Value>
</Valute>
<Valute ID="R01200">
	<NumCode>344</NumCode>
	<CharCode>HKD</CharCode>
	<Nominal>10</Nominal>
	<Name>����������� ��������</Name>
	<Value>72,1596</Value>
</Valute>
<Valute ID="R01215">
	<NumCode>208</NumCode>
	<CharCode>DKK</CharCode>
	<Nominal>10</Nominal>
	<Name>������� ����</Name>
	<Value>92,7135</Value>
</Valute>
<Valute ID="R01235">
	<NumCode>840</NumCode>
	<CharCode>USD</CharCode>
	<Nominal>1</Nominal>
	<Name>������ ���</Name>
	<Value>56,4115</Value>
</Valute>
<Valute ID="R01239">
	<NumCode>978</NumCode>
	<CharCode>EUR</CharCode>
	<Nominal>1</Nominal>
	<Name>����</Name>
	<Value>69,0702</Value>
</Valute>
<Valute ID="R01270">
	<NumCode>356</NumCode>
	<CharCode>INR</CharCode>
	<Nominal>100</Nominal>
	<Name>��������� �����</Name>
	<Value>88,3846</Value>
</Valute>
<Valute ID="R01335">
	<NumCode>398</NumCode>
	<CharCode>KZT</CharCode>
	<Nominal>100</Nominal>
	<Name>������������� �����</Name>
	<Value>17,4654</Value>
</Valute>
<Valute ID="R01350">
	<NumCode>124</NumCode>
	<CharCode>CAD</CharCode>
	<Nominal>1</Nominal>
	<Name>��������� ������</Name>
	<Value>45,1689</Value>
</Valute>
<Valute ID="R01370">
	<NumCode>417</NumCode>
	<CharCode>KGS</CharCode>
	<Nominal>100</Nominal>
	<Name>���������� �����</Name>
	<Value>82,1128</Value>
</Valute>
<Valute ID="R01375">
	<NumCode>156</NumCode>
	<CharCode>CNY</CharCode>
	<Nominal>10</Nominal>
	<Name>��������� �����</Name>
	<Value>88,1003</Value>
</Valute>
<Valute ID="R01500">
	<NumCode>498</NumCode>
	<CharCode>MDL</CharCode>
	<Nominal>10</Nominal>
	<Name>���������� ����</Name>
	<Value>33,4786</Value>
</Valute>
<Valute ID="R01535">
	<NumCode>578</NumCode>
	<CharCode>NOK</CharCode>
	<Nominal>10</Nominal>
	<Name>���������� ����</Name>
	<Value>71,6455</Value>
</Valute>
<Valute ID="R01565">
	<NumCode>985</NumCode>
	<CharCode>PLN</CharCode>
	<Nominal>1</Nominal>
	<Name>�������� ������</Name>
	<Value>16,5386</Value>
</Valute>
<Valute ID="R01585F">
	<NumCode>946</NumCode>
	<CharCode>RON</CharCode>
	<Nominal>1</Nominal>
	<Name>��������� ���</Name>
	<Value>14,7934</Value>
</Valute>
<Valute ID="R01589">
	<NumCode>960</NumCode>
	<CharCode>XDR</CharCode>
	<Nominal>1</Nominal>
	<Name>��� (����������� ����� �������������)</Name>
	<Value>81,3510</Value>
</Valute>
<Valute ID="R01625">
	<NumCode>702</NumCode>
	<CharCode>SGD</CharCode>
	<Nominal>1</Nominal>
	<Name>������������ ������</Name>
	<Value>42,7198</Value>
</Valute>
<Valute ID="R01670">
	<NumCode>972</NumCode>
	<CharCode>TJS</CharCode>
	<Nominal>10</Nominal>
	<Name>���������� ������</Name>
	<Value>63,9949</Value>
</Valute>
<Valute ID="R01700J">
	<NumCode>949</NumCode>
	<CharCode>TRY</CharCode>
	<Nominal>1</Nominal>
	<Name>�������� ����</Name>
	<Value>14,8545</Value>
</Valute>
<Valute ID="R01710A">
	<NumCode>934</NumCode>
	<CharCode>TMT</CharCode>
	<Nominal>1</Nominal>
	<Name>����� ����������� �����</Name>
	<Value>16,1406</Value>
</Valute>
<Valute ID="R01717">
	<NumCode>860</NumCode>
	<CharCode>UZS</CharCode>
	<Nominal>10000</Nominal>
	<Name>��������� �����</Name>
	<Value>69,0987</Value>
</Valute>
<Valute ID="R01720">
	<NumCode>980</NumCode>
	<CharCode>UAH</CharCode>
	<Nominal>10</Nominal>
	<Name>���������� ������</Name>
	<Value>19,5179</Value>
</Valute>
<Valute ID="R01760">
	<NumCode>203</NumCode>
	<CharCode>CZK</CharCode>
	<Nominal>10</Nominal>
	<Name>������� ����</Name>
	<Value>27,1496</Value>
</Valute>
<Valute ID="R01770">
	<NumCode>752</NumCode>
	<CharCode>SEK</CharCode>
	<Nominal>10</Nominal>
	<Name>�������� ����</Name>
	<Value>70,1670</Value>
</Valute>
<Valute ID="R01775">
	<NumCode>756</NumCode>
	<CharCode>CHF</CharCode>
	<Nominal>1</Nominal>
	<Name>����������� �����</Name>
	<Value>58,5850</Value>
</Valute>
<Valute ID="R01810">
	<NumCode>710</NumCode>
	<CharCode>ZAR</CharCode>
	<Nominal>10</Nominal>
	<Name>��������������� ������</Name>
	<Value>46,5841</Value>
</Valute>
<Valute ID="R01815">
	<NumCode>410</NumCode>
	<CharCode>KRW</CharCode>
	<Nominal>1000</Nominal>
	<Name>��� ���������� �����</Name>
	<Value>52,5012</Value>
</Valute>
<Valute ID="R01820">
	<NumCode>392</NumCode>
	<CharCode>JPY</CharCode>
	<Nominal>100</Nominal>
	<Name>�������� ���</Name>
	<Value>50,8418</Value>
</Valute>
</ValCurs>
';
}else{
	echo $xml;
}
?>