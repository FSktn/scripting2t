<?php
// set content-type
header('Content-Type: application/json');

// Maak verbinding met de database
$db = new SQLite3("memes.db");
$db->busyTimeout(5000);
 
// Selecteer alle memes uit de memes-tabel
// gesorteerd op jaar aflopend (nieuwste eerst)
$query = "SELECT * FROM memes ORDER BY year DESC";
$result = $db->query($query);

// Initialiseer array voor resultaten
$jsonArray = [];

// Controleer of query succesvol was
if ($result) {
    // Loop door resultaten en voeg toe aan array
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $jsonArray[] = $row;
    }
} else {
    // Behandel query-fout
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit;
}

// Encodeer array als JSON en geef weer
$json = json_encode($jsonArray);
echo $json;

