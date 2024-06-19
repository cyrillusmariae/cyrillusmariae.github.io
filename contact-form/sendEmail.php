<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = trim($_POST["message"]);

  // Check data
  if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please fill out all fields correctly.";
    exit;
  }

  // Set recipient email address
  $to = "chavezpoon@icloud.com";
  $subject = "New message from $name";
  $body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";

  // Send email
  if (mail($to, $subject, $body)) {
    http_response_code(200);
    echo "Message sent successfully!";
  } else {
    http_response_code(500);
    echo "Failed to send message. Please try again later.";
  }
} else {
  http_response_code(403);
  echo "There was a problem with your submission, please try again.";
}
?>
