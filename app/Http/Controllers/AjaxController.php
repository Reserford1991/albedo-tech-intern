<?php

namespace App\Http\Controllers;

use App\AjaxModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AjaxController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, AjaxModel $ajaxModel)
    {
        $data = $request->all();


        if (($ajaxModel->where('mail', '=', $data['mail'])->exists()) && $data['update'] == 0) {
            $response = ["database" => "Email is already registered",
                "id" => $ajaxModel->id];
            return response()->json(array('saved' => $response), 200);
        } else if ($data['update'] == 1) {
            unset($data['update']);
            $data['birthdate'] = strtotime($data['birthdate']);
            $data['created_at'] = time();
            $ajaxModel->where('mail', $data['mail'])
                ->update($data);
            $response = ["database" => "Data has been successfully saved",
                "id" => $ajaxModel->id];
            return response()->json(array('saved' => $response), 200);
        }

        unset($data['update']);

        $data['birthdate'] = strtotime($data['birthdate']);
        $data['created_at'] = time();
        $ajaxModel->fill($data);
        $ajaxModel->save();
        $response = ["database" => "Data has been successfully saved",
            "id" => $ajaxModel->id];
        return response()->json(array('saved' => $response), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\AjaxModel $ajaxModel
     * @return \Illuminate\Http\Response
     */
    public function updateData(Request $request, AjaxModel $ajaxModel)
    {
        $data = $request->all();
        $path = false;
        if ($data['photo'] != "undefined") {
            $validator = $request->validate(
                ['photo' => 'max:2000'],
                ['max' => 'Max file size is 2 MB']);

            $path = $request->file('photo')->store('/images/avatars', 'public');
        }
        $array = explode('/', $path);
        $filename = end($array);

        $data['photo'] = $path ? $path : "";
//        $data['photo'] = $filename ? $filename : "";
        $ajaxModel->where('id', $data['id'])
            ->update($data);
        $response = ["database" => "Data has been successfully added",
            "id" => $ajaxModel->id];
        return response()->json(array('saved' => $response), 200);
    }

    /*
     * Returns current number of all members from database
     * @return \Illuminate\Http\Response
     * */
    public function getAllNum(Request $request, AjaxModel $ajaxModel)
    {
        if ($request->user()) {
            $num = $ajaxModel->count();
        } else {
            $num = $ajaxModel->where('hidden', 0)
                ->count();
        }
        return response()->json(array('num' => $num), 200);
    }

    public function hideMember(Request $request, AjaxModel $ajaxModel)
    {
        $data = $request->all();
        $ajaxModel->where('id', $data['id'])
            ->update(array('hidden' => 1));
        return response()->json(array('msg' => $data), 200);
    }

    public function showMember(Request $request, AjaxModel $ajaxModel)
    {
        $data = $request->all();
        $ajaxModel->where('id', $data['id'])
            ->update(array('hidden' => 0));
        return response()->json(array('msg' => $data), 200);
    }
}
