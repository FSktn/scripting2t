<?php
// zet content-type voor JSON response
header('Content-Type: application/json');

// Haal POST-gegevens op
$title = $_POST['title'] ?? '';
$year = $_POST['year'] ?? '';
$description = $_POST['description'] ?? '';
$imageUrl = $_POST['imageUrl'] ?? '';
$tags = $_POST['tags'] ?? '';

// Valideer vereiste velden
if (empty($title) || empty($year) || empty($description) || empty($imageUrl)) {
    http_response_code(400);
    echo json_encode(['error' => 'Alle velden zijn verplicht']);
    exit;
}

// Maak verbinding met de database
$db = new SQLite3("memes.db");
$db->busyTimeout(5000);

// Prepareer en voer insert-query uit met juiste escaping
$stmt = $db->prepare("INSERT INTO memes (title, year, description, url, tags) VALUES (?, ?, ?, ?, ?)");
$stmt->bindValue(1, $title, SQLITE3_TEXT);
$stmt->bindValue(2, intval($year), SQLITE3_INTEGER);
$stmt->bindValue(3, $description, SQLITE3_TEXT);
$stmt->bindValue(4, $imageUrl, SQLITE3_TEXT);
$stmt->bindValue(5, $tags, SQLITE3_TEXT);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Meme added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add meme to database']);
}

