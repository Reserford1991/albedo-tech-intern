<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once('connection.php');
DB\Connection::connect();

if (isset($_GET['controller']) && isset($_GET['action'])) {
    $controller = $_GET['controller'];
    $action     = $_GET['action'];
    if ($controller=='ajax') {
        require_once('routes.php');
    }
    else require_once('views/layout.php');
}
else {
    $controller = 'pages';
    $action     = 'home';
    require_once('views/layout.php');
}
?>