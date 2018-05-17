<?php

class membersModel {

    public function __construct() {
    }

    public static function all() {
        $db = DB\Connection::getInstance();
        $req = $db->query('SELECT COUNT(*) FROM   members AS num_records;');
        $num = $req->fetchColumn();
        return $num;
    }

    public static function allInfo() {
        $db = DB\Connection::getInstance();
        $req = $db->query('SELECT name, surname, report, mail, photo FROM members AS info;');
        $list = $req->fetchAll(PDO::FETCH_ASSOC);
        return $list;
    }
}