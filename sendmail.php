<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguge('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('info@fls.guru', 'Андрей')ж
    //Кому отправить
    $mail->addAddress('code@fls.guru');
    //Тема письма
    $mail->Subject = 'Привет, это Андрей!';

    //Пол
    $gender = "Мужской";
    if ($_POST['gender'] == "female") {
        $gender = "Женский";
    }

    //Тело письма
    $body = '<h1>Вам пришло письмо с Вашего первого сайта!</h1>';

    if (trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if (trim(!empty($_POST['gender']))) {
        $body.='<p><strong>Пол:</strong> '.$gender.'</p>';
    }
    if (trim(!empty($_POST['age']))) {
        $body.='<p><strong>Возраст:</strong> '.$_POST['message'].'</p>';
    }


    //Прикрепить файл
    if (!empty($_FILES['image']['tmp_name'])) {
        //путь загрузкт файла
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        //грзим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    //Отправляем
    if (!$mail->send()){
        $message = 'Ошибка';
    }else {
        $message = 'Данные отправлены!';
    }
    
    $responce = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($responce);
?>    