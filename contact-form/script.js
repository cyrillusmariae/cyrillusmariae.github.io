document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('statusMessage').textContent = 'Message sent successfully!';
      form.reset();
    } else {
      document.getElementById('statusMessage').textContent = 'Failed to send message. Please try again.';
    }
  })
  .catch(error => {
    console.error('Error sending message:', error);
    document.getElementById('statusMessage').textContent = 'Failed to send message. Please try again.';
  });
});
