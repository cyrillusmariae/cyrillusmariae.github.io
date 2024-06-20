document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const previewImage = document.getElementById('preview-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imagePath = thumbnail.getAttribute('src');
            previewImage.setAttribute('src', imagePath);
        });
    });
});
