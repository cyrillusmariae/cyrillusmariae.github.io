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

    // Save appointment (simulated for demo with localStorage)
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('datetime').value = '';
    document.getElementById('service').value = '';

    // Update upcoming appointments list
    updateAppointmentsList();
});

function updateAppointmentsList() {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<p>No upcoming appointments.</p>';
    } else {
        appointments.forEach(function(appointment, index) {
            var appointmentDateTime = new Date(appointment.datetime).toLocaleString();
            var html = '<li class="appointment">';
            html += '<p><strong>Name:</strong> ' + appointment.name + '</p>';
            html += '<p><strong>Email:</strong> ' + appointment.email + '</p>';
            html += '<p><strong>Phone:</strong> ' + appointment.phone + '</p>';
            html += '<p><strong>Date and Time:</strong> ' + appointmentDateTime + '</p>';
            html += '<p><strong>Service:</strong> ' + appointment.service + '</p>';
            html += '</li>';
            appointmentsList.innerHTML += html;
        });
    }
}

// Initial update of appointments list on page load
updateAppointmentsList();
