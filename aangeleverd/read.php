<?php
// set content-type
header('Content-Type: application/json');

// Maak verbinding met de database
$db = new SQLite3("memes.db");
$db->busyTimeout(5000);
 
// Select all memes from the memes table
// ordered by year descending (newest first)
$query = "SELECT * FROM memes ORDER BY year DESC";
$result = $db->query($query);

// Initialize array for results
$jsonArray = [];

// Check if query was successful
if ($result) {
    // Loop through results and add to array
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $jsonArray[] = $row;
    }
} else {
    // Handle query error
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit;
}

// Encode array as JSON and output
$json = json_encode($jsonArray);
echo $json;

