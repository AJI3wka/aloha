<!DOCTYPE html>
<html lang="ru">
<head>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=1200">
        <title>Document</title>
        <link type="image/x-icon" href="favicon.ico" rel="shortcut icon">
        <script>
            if (screen.width <= 750) {
                document.location = "../mobile/" + document.location.search;
            }
        </script>
        <style>
            <?php include('css/head.css');
            ?>
        </style>
        <link type="text/css" href="css/libs.css" rel="stylesheet">
        <link type="text/css" href="css/style.css" rel="stylesheet">
        <link type="text/css" href="css/media.css" rel="stylesheet">
        <link type="text/css" href="css/scripts.css" rel="stylesheet">


        <?php include('../track/head.php'); ?>
</head>
<body>
    
    <section class="buratino">
        <div>
            <div>
                <h1>
                    <span>Бу</span>
                    <span>ра</span>
                    <span>ти</span>
                    <span>но</span>
                </h1>
            </div>
        </div>
    </section>
        
	

        <?php include('../track/body.php'); ?>
</body>
</html>