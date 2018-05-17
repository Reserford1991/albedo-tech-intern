<?php

class ajaxModel {
    private static $table = 'members';

    public function __construct() {
    }

    public static function addMember($array) {
        $req = $db = DB\Connection::getInstance();
        $rows = '';
        $values = '';
        foreach($array as $key=>$value){
            $rows .= "`".$key . "`,";
            $values .= "'" . $value . "',";
        }
        $rows = substr($rows, 0, -1);
        $values = substr($values, 0, -1);
        $query = "INSERT INTO `" . self::$table ."` (". $rows .") VALUES (". $values .");";
        // todo: change query method to exec method
        $req = $db->query("$query");
        if ($req) $id = $db->lastInsertId();
        return $id ? $id : false;
    }

    public static function updateMember($array, $mail){
        $req = $db = DB\Connection::getInstance();
        $string = '';
        foreach($array as $key=>$value){
            $string .= $key . "='" . $value . "',";
        }
        $string = substr($string, 0, -1);
        $query = "UPDATE `" . self::$table ."` SET ". $string ." WHERE mail='" . $mail ."';";
        // todo: change query method to exec method
        $req = $db->query("$query");
        if ($req){
            $query = "SELECT `id` FROM `" . self::$table ."` WHERE mail='" . $mail ."';";
            $req = $db->query("$query");
            $id = $req->fetchColumn();
        }
        return $id ? $id : false;
    }

    public static function addInfoMember($array, $id) {
        $req = $db = DB\Connection::getInstance();
        $string = '';
        foreach($array as $key=>$value){
            $string .= $key . "='" . $value . "',";
        }
        $string = substr($string, 0, -1);
        $query = "UPDATE `" . self::$table ."` SET ". $string ." WHERE id=" . $id .";";
        // todo: change query method to exec method
        $req = $db->query("$query");
        return $req;
    }

    public static function checkMail($mail) {
        $req = $db = DB\Connection::getInstance();
        $query = "SELECT * FROM `members` WHERE `mail` = '$mail'";
        $req = $db->query("$query");
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function checkMailUpdate($mail) {
        $req = $db = DB\Connection::getInstance();
        $query = "SELECT * FROM `members` WHERE `mail` = '$mail'";
        $req = $db->query("$query");
        $result = $req->fetchColumn();
        return $result;
    }

    public static function all() {
        $db = DB\Connection::getInstance();
        $req = $db->query('SELECT COUNT(*) FROM   members AS num_records;');
        $num = $req->fetchColumn();
        return $num;
    }
}