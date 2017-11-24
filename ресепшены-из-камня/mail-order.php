<?
#Получаем данные методом POST и отсекаем пробельные символы в начале и конце:
$email = @ trim ($_POST['email']);
$phone = @ trim ($_POST['phone']);
$q1 = @ trim ($_POST['q1']);
$q2 = @ trim ($_POST['q2']);
$q3 = @ trim ($_POST['q3']);
$q4 = @ trim ($_POST['q4']);
$q5 = @ trim ($_POST['q5']);
$sumQ2 = @ trim ($_POST['sumQ2']);
$yourCount = @ trim ($_POST['yourCount']);

#Получатель письма:
mail ("brenstone@yandex.ru",
#Формируем письмо:
      "Заказ с сайта ресепшн ",
      "Заказ\n 
      email:$email \n 
      Телефон: $phone \n
      Какой вид стойки Вы хотите?: $q1 \n
      Выберите конфигурацию Вашей стойки: $q2 \n
      Выберите цветовое решение: $q3 \n
      Выберите размеры забора: $q4 \n
      Желаемый срок ввода в эксплуатацию? $q5 \n
      Скидка: $yourCount руб.\n

      ",
      "Content-type:text/plain; charset=utf-8");

?>