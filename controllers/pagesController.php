<?php
include_once ("config/address.php");
include_once ("config/googleAPI.php");
include_once ("config/socialLinks.php");

//global $address;
//global $apiKey;

class PagesController {

    private $address;
    private $apiKey;
    private $twitterLink;
    private $googlePlusLink;
    private $facebookLink;

    public function __construct(){

    }

    public function home() {

        $this->address = $GLOBALS['address'];
        $this->apiKey = $GLOBALS['apiKey'];
        $this->twitterLink = $GLOBALS['twitterLink'];
        $this->googlePlusLink = $GLOBALS['googlePlusLink'];
        $this->facebookLink = $GLOBALS['facebookLink'];

        // Request to google API
        $api_key = $this->apiKey;
        $address = rawurlencode($this->address);
        $link = "https://maps.googleapis.com/maps/api/geocode/json?address=7060%20Hollywood%20Blvd,%20Los%20Angeles,%20CA&key=AIzaSyBMWjSqvLxglIo1NJBw7hEsph-NlzZDbFQ&sensor=false&oe=utf8";
        $twitterLink = $this->twitterLink;
        $googlePlusLink = $this->googlePlusLink;
        $facebookLink = $this->facebookLink;
        $page = json_decode(file_get_contents($link), TRUE);
        $status = $page['status'];
        if($status!="OK"){
            $location = "0, 0";
        }else{
            $lat = $page['results'][0]['geometry']['location']['lat'];
            $lng = $page['results'][0]['geometry']['location']['lng'];
            $location = "$lat, $lng";
        }

        $allMembers = membersModel::all();
        require_once('views/pages/map.php');
        require_once('views/pages/form1.php');
//        require_once('views/pages/form2.php');
    }

    public function form2(){
        $twitterHref = $this->twitterUrl . '?text=' . rawurlencode($this->twitterText);
        require_once('views/pages/form2.php');
    }

    public function table(){
        $allMembersInfo = membersModel::allInfo();
        foreach ($allMembersInfo as &$member){
            if ($member['photo'] == '') $member['photo'] = "http://". $_SERVER['SERVER_NAME'] . "/assets/images/defaultPerson.jpg";
            else $member['photo'] = "http://". $_SERVER['SERVER_NAME'] . "/uploads/" . $member['photo'];
        }
        require_once('views/pages/table.php');
    }

    public function error() {
        require_once('views/pages/error.php');
    }
}
?>