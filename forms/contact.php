<?php
  $receiving_email_address = 'cyrillusmariae@outlook.com';

  $name = trim($_POST['name'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $subject = trim($_POST['subject'] ?? 'Website contact form');
  $phone = trim($_POST['phone'] ?? '');
  $message = trim($_POST['message'] ?? '');

  if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo 'Please provide your name, a valid email address, and a message.';
    exit;
  }

  $subject = str_replace(["\r", "\n"], '', $subject);
  $body = "Name: {$name}\nEmail: {$email}";
  if ($phone !== '') {
    $body .= "\nPhone: {$phone}";
  }
  $body .= "\n\n{$message}";

  $headers = "From: {$receiving_email_address}\r\n";
  $headers .= "Reply-To: {$email}\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  if (mail($receiving_email_address, $subject, $body, $headers)) {
    echo 'OK';
  } else {
    http_response_code(500);
    echo 'Unable to send your message right now.';
  }
?>
