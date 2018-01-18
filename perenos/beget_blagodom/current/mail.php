<?php 



//$to  = 'info@teplosmart.ru'; // -  вебмастер, который занимался данным сайтом
$to  = 'info@teplosmart.ru';

$subject = 'Новый клиент на отопление загородного дома';

$message = '
<html>
<head>
 <title>Новый клиент на отопление загородного дома</title>
  
</head>
<body>
<center>
  <p>Заявка с Вашего сайта.</p>
  <table style="border-collapse: collapse;">
    <tr>
		<td style="border:1px solid black;padding:10px;">Имя:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['name'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Телефон:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['phone'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">E-mail:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['E-mail'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Площадь:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['all_square'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Площадь теплого пола:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['small_square'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Скидка:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['skidka'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Экран:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['form_subject'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Источник кампании:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['utm_source'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Тип трафика:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['utm_medium'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Название кампании:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['utm_campaign'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Идентификатор объявления:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['utm_term'] . '</td>			
	</tr>
	<tr>
		<td style="border:1px solid black;padding:10px;">Ключевое слово:</td>
		<td style="border:1px solid black;padding:10px;">' . $_POST['utm_content'] . '</td>			
	</tr>

	
  </table>
  </center>
</body>
</html>
';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$headers .= 'From: Клиент на отопление домов <монтаж-отопления-домов.рф>' . "\r\n";

$mailing = mail($to, $subject, $message, $headers);

$to = $_POST['email'];
ob_start();
$message = ob_get_clean(); 

$mailing = mail($to, $subject, $message, $headers);


if (isset($_POST['E-mail'])) {
	$to = $_POST['E-mail'];
	$subject = '22 ошибки при выборе отопления для дома';
	
	$message = '
<html>
<head>
 <title>22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ.</title>
  
</head>
<body>
<center>
<a href="http://монтаж-отопления-домов.рф/22_oshibki.pdf" download>Скачайте книгу 22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ</a><p>
<a href="http://монтаж-отопления-домов.рф/22_oshibki.pdf" >Или смотрите 22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ online</a></p>
</center>
</body>
</html>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$headers .= 'From: монтаж-отопления-домов.рф' . "\r\n";

$mailing = mail($to, $subject, $message, $headers);
};






header("Location: /thanks.html"); 





 
?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Благодарим за заказ!</title>
	<link href="http://fonts.googleapis.com/css?family=Ubuntu:400,500,400italic&amp;subset=latin,cyrillic" rel="stylesheet" type="text/css">
</head>
<body style="background: #EEE;">

<h2 style="text-align: center; padding-top: 60px; font: italic 24px Ubuntu;">Спасибо за заявку, мы<br> скоро свяжемся!</h2>
<a href="/" style="text-align: center;  color: #00afef;
    font: 500 22px Ubuntu;"><h4 style="padding-top: 50px;">Вернуться назад</h4></a>
    <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter45487584 = new Ya.Metrika({
                    id:45487584,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/45487584" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
</body>

</html>
