class Meme {
    constructor(title = '', year = '', description = '', imageUrl = '', tags = []) {
        this.title = title;
        this.year = year;
        this.description = description;
        this.imageUrl = imageUrl;
        this.tags = Array.isArray(tags) ? tags : [];
    }

    show() {
        const tbody = document.querySelector('#outputTable tbody');
        const row = tbody.insertRow();
        
        // Image cell
        const imageCell = row.insertCell();
        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.alt = this.title;
        img.style.maxWidth = '100px';
        img.style.maxHeight = '100px';
        img.style.objectFit = 'cover';
        imageCell.appendChild(img);
        
        // Title cell
        const titleCell = row.insertCell();
        titleCell.textContent = this.title;
        
        // Year cell
        const yearCell = row.insertCell();
        yearCell.textContent = this.year;
        
        // Description cell
        const descCell = row.insertCell();
        descCell.textContent = this.description;
        
        // Tags cell
        const tagsCell = row.insertCell();
        tagsCell.textContent = this.tags.join(', ');
    }

    save() {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('year', this.year);
        formData.append('description', this.description);
        formData.append('imageUrl', this.imageUrl);
        formData.append('tags', JSON.stringify(this.tags));

        fetch('write.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Meme saved successfully');
                // voeg de meme toe aan de tabel
                this.show();
                // leeg het formulier
                document.getElementById('newMeme').reset();
            } else {
                throw new Error('Failed to save meme');
            }
        })
        .catch(error => {
            console.error('Error saving meme:', error);
            alert('Error saving meme. Please try again.');
        });
    }
}

function success() {
    let data = JSON.parse(this.responseText);
    console.log(data);
    
    // Maak bestaande tabelinhoud leeg
    const tbody = document.querySelector('#outputTable tbody');
    tbody.innerHTML = '';
    
    // Maak Meme-objecten aan en toon ze
    if (Array.isArray(data)) {
        data.forEach(memeData => {
            // Parse tags als ze als JSON-string zijn opgeslagen
            let tags = [];
            if (memeData.tags) {
                try {
                    tags = JSON.parse(memeData.tags);
                } catch (e) {
                    // Als het geen JSON is, splits dan op komma
                    tags = memeData.tags.split(',').map(tag => tag.trim());
                }
            }
            
            const meme = new Meme(
                memeData.title,
                memeData.year,
                memeData.description,
                memeData.url || memeData.imageUrl || '',
                tags
            );
            meme.show();
        });
    }
}

function error(err) {
    console.error('An error occurred:', err);
    alert('Error loading memes. Please refresh the page.');
}

function addMeme(e) {
    e.preventDefault();
    
    // Haal formuliergegevens op
    const title = document.getElementById('title').value.trim();
    const year = document.getElementById('year').value.trim();
    const description = document.getElementById('description').value.trim();
    const imageUrl = document.getElementById('imageUrl').value.trim();
    const tagsString = document.getElementById('tags').value.trim();
    
    // Valideer vereiste velden
    if (!title || !year || !description || !imageUrl) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Parse tags naar array
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    const newMeme = new Meme(title, year, description, imageUrl, tags);
    newMeme.save();
}

// Haal data op van de server met fetch
function getData() {
    fetch('read.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Simuleer de oude XMLHttpRequest success callback
            success.call({responseText: data});
        })
        .catch(err => {
            error(err);
        });
}

// Laad data wanneer de pagina laadt
getData();

window.addEventListener('load', () => {
    document.getElementById('addButton').addEventListener('click', addMeme);
})

