document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const galleryDiv = document.querySelector('.gallery');
    
    // Cargar imágenes desde el archivo JSON
    let images = [];
    fetch('json.json')
        .then(response => response.json())
        .then(data => {
            images = data;
            displayImages(images);
        });
    
    // Filtrar y mostrar imagen
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        // Si el campo de búsqueda está vacío, limpiar el div
        if (searchTerm === '') {
            galleryDiv.innerHTML = '';
            return;
        }

        const filteredImage = images.find(image =>
            image.title.toLowerCase().includes(searchTerm) ||
            image.description.toLowerCase().includes(searchTerm)
        );
        displayImage(filteredImage);
    });
    
    function displayImage(image) {
        galleryDiv.innerHTML = '';
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.title;
            imgElement.classList.add('img-fluid', 'mb-3', 'mx-auto')

            const downloadButton = document.createElement('a');
            downloadButton.href = image.src;
            downloadButton.download = image.title; // El nombre del archivo para la descarga
            downloadButton.classList.add('btn', 'btn-secondary', 'd-block', 'mx-auto'); // Bootstrap classes
            downloadButton.textContent = 'Download Image';
    
            galleryDiv.appendChild(imgElement);
            galleryDiv.appendChild(downloadButton);
        }
    }
});



