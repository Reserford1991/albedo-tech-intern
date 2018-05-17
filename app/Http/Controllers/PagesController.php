<?php

namespace App\Http\Controllers;

use App\PagesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

use League\Flysystem\Config;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, PagesModel $pagesModel)
    {

        if($request->user())
        {
            $allMembers = $pagesModel->count();
        } else {
            $allMembers = $pagesModel->where('hidden', 0)
            ->count();
        }

        $googlePlusLink = config('pageData.googlePlusLink');
        $facebookLink = config('pageData.facebookLink');
        $twitterLink = config('pageData.twitterLink');

        // Request to google API
        $api_key = config('pageData.googleMapsApiKey');
        $address = rawurlencode(config('pageData.address'));
        $link = "https://maps.googleapis.com/maps/api/geocode/json?address=7060%20Hollywood%20Blvd,%20Los%20Angeles,%20CA&key=AIzaSyBMWjSqvLxglIo1NJBw7hEsph-NlzZDbFQ&sensor=false&oe=utf8";
        $page = json_decode(file_get_contents($link), TRUE);
        $status = $page['status'];
        if($status!="OK"){
            $location = "0, 0";
        }else{
            $lat = $page['results'][0]['geometry']['location']['lat'];
            $lng = $page['results'][0]['geometry']['location']['lng'];
            $location = "$lat, $lng";
        }

        return view('main', [
            'lat' => $lat,
            'lng' => $lng,
            'allMembers' => $allMembers,
            'googlePlusLink' => $googlePlusLink,
            'facebookLink' => $facebookLink,
            'twitterLink' => $twitterLink
        ]);
    }

    /*
     * Show members table
     *
     * @return \Illuminate\Http\Response
    */
    public function showTable(Request $request, PagesModel $pagesModel){

        if($request->user())
        {
            $admin = true;
            $allMembersInfo = $pagesModel->all();
        } else {
            $admin = false;
            $allMembersInfo = $pagesModel->all()
                ->where('hidden', 0);
        }

        $array = explode("/",getcwd() );
        $removed = array_pop( $array );
        $real_path = implode('/',  $array);

        foreach ($allMembersInfo as &$member){
            if ($member->photo == "") $member->photo = "http://". $_SERVER['SERVER_NAME'] . "/storage/images/defaultPerson.jpg";
//            else $member->photo = $real_path . '/storage/app/public/images/avatars/' . $member->photo;
            else $member->photo = "http://". $_SERVER['SERVER_NAME'] . "/storage/" . $member->photo;
        }
        return view('mainTable', [
            'allMembersInfo' => $allMembersInfo,
            'admin' => $admin
        ]);
    }
}
