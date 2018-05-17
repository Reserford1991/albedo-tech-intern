<?php

namespace DB;

class Connection
{

//    const SERVERNAME = "localhost";
//    const USERNAME = "matveev_v";
//    const PASSWORD = "up49ISk";
//    const DBNAME = "matveev_v";

    const SERVERNAME = "localhost";
    const USERNAME = "root";
    const PASSWORD = "123";
    const DBNAME = "regformdb";

    private static $instance = NULL;

    private function __construct() {}

    private function __clone() {}

    public static function test()
    {
        return "It works!!!";
    }

    public static function connect()
    {

        $server = self::SERVERNAME;
        $user = self::USERNAME;
        $pass = self::PASSWORD;
        $db = self::DBNAME;
        try {
            $conn = new \PDO("mysql:host=$server;dbname=$db", $user, $pass);
//    set the PDO error mode to exception
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
//            $conn->set_charset("utf8");
//            echo "Connected successfully";
        } catch
        (\PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }
    }

    public static function getInstance() {
        $server = self::SERVERNAME;
        $user = self::USERNAME;
        $pass = self::PASSWORD;
        $db = self::DBNAME;
        if (!isset(self::$instance)) {
            $pdo_options[\PDO::ATTR_ERRMODE] = \PDO::ERRMODE_EXCEPTION;
            self::$instance = new \PDO("mysql:host=$server;dbname=$db", $user, $pass);
        }
        return self::$instance;
    }
}

//class Db {
//    private static $instance = NULL;
//
//    private function __construct() {}
//
//    private function __clone() {}
//
//    public static function getInstance() {
//        if (!isset(self::$instance)) {
//            $pdo_options[\PDO::ATTR_ERRMODE] = \PDO::ERRMODE_EXCEPTION;
//            self::$instance = new \PDO('mysql:host=localhost;dbname=php_mvc', 'root', '', $pdo_options);
//        }
//        return self::$instance;
//    }
//}
?>