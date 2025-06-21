<?php
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM usuarios";
        $result = $conn->query($sql);
        $usuarios = [];
        while($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
        echo json_encode($usuarios);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $nombre = $data['nombre'];
        $email = $data['email'];
        $sql = "INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Usuario creado!", "id" => $conn->insert_id]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case 'PUT':
        $id = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $nombre = $data['nombre'];
        $email = $data['email'];
        $sql = "UPDATE usuarios SET nombre='$nombre', email='$email' WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Usuario actualizado!"]);
        } else {
            echo json_encode(["error" => "Error al actualizar: " . $conn->error]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM usuarios WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Usuario eliminado!"]);
        } else {
            echo json_encode(["error" => "Error al eliminar: " . $conn->error]);
        }
        break;
}

$conn->close();
?>