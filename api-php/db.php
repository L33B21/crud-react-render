<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejar la solicitud pre-vuelo OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$servername = "sql210.infinityfree.com"; // Lo obtendrás de InfinityFree
$username = "if0_38760424";           // Lo obtendrás de InfinityFree
$password = "tfYLQxmdA5kX";             // Lo obtendrás de InfinityFree
$dbname = "if0_38760424_crud_react";   // Lo obtendrás de InfinityFree

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>