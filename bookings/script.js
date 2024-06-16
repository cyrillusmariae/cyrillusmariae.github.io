document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var datetime = document.getElementById('datetime').value;
    var service = document.getElementById('service').value;

    // Validate form inputs
    if (!name || !email || !phone || !datetime || !service) {
        alert('Please fill in all fields.');
        return;
    }

    // Create appointment object
    var appointment = {
        name: name,
        email: email,
        phone: phone,
        datetime: datetime,
        service: service
    };

    // Send appointment data to server via fetch API (POST request)
    fetch('/bookings/sendEmail.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Appointment booked successfully. Check your email for confirmation.');

        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('datetime').value = '';
        document.getElementById('service').value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
