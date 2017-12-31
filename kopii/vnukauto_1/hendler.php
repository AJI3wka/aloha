<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$subject_1 = $_POST['subject'];
$mark = $_POST['mark']; //марка автомобиля
$review = $_POST['review'];//отзыв		
$problem = $_POST['problem'];//какая проблема
$where = $_POST['where'];//где неисправность
$polomka = $_POST['polomka'];//Какая поломка
$desc =$_POST['desc'];//описание своими словами

$type = $_GET['type'];
if(isset($_GET['type'])){

	if($type=='ordCall'){

		$subject_1 == 'Заказ звонка';

	}
	if($type=='calcCost'){
		
		$subject_1 == 'Расчитать стоимость ремонта';

	}
	if($type=='quoteForm'){

		$subject_1 == 'Оценка стоимости ремонта';


	}
	if($type=='reviewForm'){

		$subject_1 == 'Оставьте свой отзыв';

	}
	if($type=='ordMail'){

		$subject_1 == 'Заявка на бесплатную консультацию';

	}
	if($type=='ordMassige'){

		$subject_1 == 'Расчет стоимости';

	}

}
$subject = "Запрос с сайта. Телефон: $phone";	


//$headers= "From: noreply <noreply@noreply.ru>\r\n";
//$headers.= "Reply-To: noreply <noreply@noreply.ru>\r\n";
$headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
$headers.= "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type: text/plain; charset=utf-8\r\n";

$to = "triowork2@gmail.com";

$message = "Поступил запрос с сайта\n\n";
$message .= "Запрос оставили:\n";

if(isset($_POST['name'])){
	$message .= "Имя: $name\n";
}
if(isset($_POST['phone'])){
	$message .= "Телефон: $phone\n";
}
if(isset($_POST['mark'])){
	$message .= "Марка или модель автомобиля: $mark\n";
}
if(isset($_POST['review'])){
	$message .= "Отзыв: $review\n";
}
if(isset($_POST['problem'])){
	$message .= "Проблем: $problem\n";
}
if(isset($_POST['where'])){
	$message .= "Где неисправность: $where\n";
}
if(isset($_POST['polomka'])){
	$message .= "Какая поломка: $polomka\n";
}
if(isset($_POST['desc'])){
	$message .= "Описание совими словами: $desc\n";
}

mail ($to,$subject,$message,$headers);
?>