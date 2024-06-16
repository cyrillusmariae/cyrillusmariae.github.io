<?php

// Get appointment data from POST request
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$datetime = $data['datetime'];
$service = $data['service'];

// Prepare email content
$to = "chavezpoon@icloud.com"; // Replace with your email address
$subject = "New Appointment Booking";
$message = "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
$message .= "Date and Time: $datetime\n";
$message .= "Service: $service\n";
$message .= "Please confirm this appointment.";

// Send email
$headers = "From: $email";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(array('message' => 'Email sent successfully'));
} else {
    echo json_encode(array('message' => 'Failed to send email'));
}
?>
