<?
#Получаем данные методом POST и отсекаем пробельные символы в начале и конце:
$name = @ trim ($_POST['name']);
$phone = @ trim ($_POST['phone']);
$theme = @ trim ($_POST['theme']);
#Получатель письма:
mail ("bastion.zabor@yandex.ru",
#Формируем письмо:
      "Перезвонить с сайта Заборы ",
      "Перезвоните мне\n 
      Имя клиента:$name \n 
      Телефон: $phone \n
      Форма: $theme \n
      ",
      "Content-type:text/plain; charset=utf-8");

?>