# Internet Meme Archive System

A web application for managing an archive of internet memes with object-oriented JavaScript and PHP backend.

## Features

- **Data Display**: Shows all memes in a responsive table with images, titles, years, descriptions, and tags
- **Add New Memes**: Form to add new memes with all required fields
- **Real-time Updates**: New memes appear immediately without page refresh
- **Object-Oriented Design**: Uses ES6 classes for clean code structure
- **Modern JavaScript**: Uses fetch API for HTTP requests

## Structure

### Files
- `index.html` - Main interface with form and display table
- `script/memes.js` - ES6 Meme class and JavaScript functionality
- `read.php` - Server endpoint to fetch memes from database
- `write.php` - Server endpoint to add new memes to database
- `memes.db` - SQLite database with meme data

### Meme Class Properties
- **title** (string) - Name of the meme
- **year** (number) - Year the meme became popular
- **description** (string) - Description of the meme
- **imageUrl** (string) - URL to the meme image
- **tags** (array) - Array of tag strings for categorization

## Usage

1. **View Memes**: The page automatically loads and displays all existing memes
2. **Add New Meme**: Fill out the form with all required fields:
   - Title: Name of the meme
   - Year: When it became popular
   - Description: What the meme is about
   - Image URL: Link to the meme image
   - Tags: Comma-separated tags (optional)
3. **Submit**: Click "Add" to save the new meme

## Technical Details

- Uses SQLite database for persistence
- Tags can be stored as JSON arrays or comma-separated strings
- Form validation ensures all required fields are filled
- Responsive design with clean CSS styling
- Error handling for failed requests

## Running the Application

Start a PHP development server:
```bash
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.