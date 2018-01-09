<?php 



//$to  = 'info@teplosmart.ru'; // -  вебмастер, который занимался данным сайтом
$to  = '+79000099939@yandex.ru';

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

$headers .= 'From: Клиент на отопление домов <отопление-дома-тверь.рф>' . "\r\n";

$mailing = mail($to, $subject, $message, $headers);

$to = $_POST['email'];
ob_start();
$message = ob_get_clean(); 

$mailing = mail($to, $subject, $message, $headers);


if (isset($_POST['E-mail'])) {
	$to = $_POST['E-mail'];
	$subject = '22 ошибки.';
	
	$message = '
<html>
<head>
 <title>22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ.</title>
  
</head>
<body>
<center>
<a href="http://отопление-дома-тверь.рф/22_oshibki.pdf" download>Скачайте книгу 22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ</a><p>
<a href="http://отопление-дома-тверь.рф/22_oshibki.pdf" >Или смотрите 22 ОШИБКИ ПРИ ВЫБОРЕ СИСТЕМЫ ОТОПЛЕНИЯ online</a></p>
</center>
</body>
</html>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$headers .= 'From: отопление-дома-тверь.рф' . "\r\n";

$mailing = mail($to, $subject, $message, $headers);
};





$roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
    'key'     => 'NTE1ODI6NTI0MDI6OWQwM2M0OTAyM2E0NDRlZTk1YWM0MmFlNzY5MjJmMmQ=', // Замените SECRET_KEY на секретный ключ из пункта меню Каталог интеграций -> Ваша CRM -> Настройки -> в нижней части экрана и строчке Ключ для интеграций
    'title'   => 'Название сделки',
    'comment' => $_POST['form_subject'],
    'name'    => $_POST['name'],
    'email'   => $_POST['E-mail'],
    'phone'   => $_POST['phone'],
    'is_need_callback' => '0', // Для автоматического использования обратного звонка при отправке контакта и сделки нужно поменять 0 на 1
    'fields'  => array(
    // Массив дополнительных полей, если нужны, или просто пустой массив
    // Примеры использования:
       
        "responsible_user_id" => 3, // Ответственный по сделке
        "Скидка" => $_POST['skidka'], // Заполнение доп. поля с ID 1276733
        "status_id" => 123123, // Создавать лид с определенным статусом в определенной воронке. Указывать необходимо ID статуса.
    // Подробную информацию о наименовании полей и получить список доп. полей вы можете в документации amoCRM: https://developers.amocrm.ru/rest_api/#lead
    // Более подробную информацию по работе с дополнительными полями в amoCRM, вы можете получить у нашей службы поддержки
        "charset" => "UTF-8", // Сервер преобразует значения полей из указанной кодировки в UTF-8
       
    ),
);
  
//file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));



header("Location: /thanks.html"); 





 
?>


