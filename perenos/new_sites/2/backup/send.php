<?php

$title = $_POST['title']; // Тема письма
$name = $_POST['name']; // Имя отправителя
$phone = $_POST['phone']; // Телефон отправителя


    $message = 'Имя: ' . $name . ' ; Телефон: ' . $phone;
    $to = 'tokareva.business@yandex.ru'; // Почта куда будут падать заявки
    $from='Клиент на обучение в школе';
    // функция, которая отправляет наше письмо.
    mail($to, $title, $message, 'From:'.$from);

ec
?>
