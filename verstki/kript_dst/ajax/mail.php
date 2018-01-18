<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$type = $_POST['type'];

$give = $_POST['give'];
$count_give = $_POST['count_give'];
$get = $_POST['get'];
$count_get = $_POST['count_get'];


$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_term = $_POST['utm_term'];
$source_type = $_POST['source_type'];
$source = $_POST['source'];
$position_type = $_POST['position_type'];
$position = $_POST['position'];
$added = $_POST['added'];
$creative = $_POST['creative'];
$matchtype = $_POST['matchtype'];
$location = $_POST['location'];
$url = $_POST['url'];
$title = $_POST['title'];

$subject = 'Заявка';	

//$headers= "From: noreply <noreply@noreply.ru>\r\n";
//$headers.= "Reply-To: noreply <noreply@noreply.ru>\r\n";
$headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
$headers.= "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type: text/plain; charset=utf-8\r\n";

$to = "8880700@gmail.com";

$message .= "Имя: $name\n";
$message .= "Телефон: $phone\n\n";

$message .= "Покупает/продает криптовалюту(buy/sell): $type\n";
$message .= "Отдает: $give\n";
$message .= "В количестве: $count_give\n";
$message .= "Получит: $get\n";
$message .= "В количестве: $count_get\n";

$message .= "\n";
$message .= "Источник: $utm_source\n";
$message .= "Тип источника: $utm_medium\n";
$message .= "Кампания: $utm_campaign\n";
$message .= "Ключевое слово: $utm_term\n";
$message .= "Тип площадки(поиск или контекст): $source_type\n";
$message .= "Площадка: $source\n";
$message .= "Спецразмещение или гарантия: $position_type\n";
$message .= "Позиция объявления в блоке: $position\n";
$message .= "Показ по дополнительным ролевантным фразам: $added\n";
$message .= "Идентификатор объявления: $creative\n";
$message .= "Тип соответствия ключа(e-точное/p-фразовое/b-широкое): $matchtype\n\n";
$message .= "Гео-положение отправителя: $location\n\n";
$message .= "Ссылка на сайт: $url\n";
$message .= "Заголовок: $title\n\n";

mail ($to,$subject,$message,$headers);
$to = "s.pavel@realtransit.ru";
mail ($to,$subject,$message,$headers);
$to = "triowork2@gmail.com";
mail ($to,$subject,$message,$headers);
?>