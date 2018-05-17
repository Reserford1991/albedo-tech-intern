<?php
//email validation - ^[A-Za-z0-9\.\_\%\+\-\]+@[A-Z0-9\.\-]+\.[A-Za-z]{2,4}$
//phone validation - ^(\+\d{1}\s)\(\d{3}\)\s\d{3}-\d{4}$
//simplified phone validation - ^\d{11}$
//text validation - ^[a-zA-Z ]*$

class AjaxController
{

    const DEFAULT_INPUTS = array(
        'name' => NULL,
        'surname' => NULL,
        'birthdate' => NULL,
        'report' => NULL,
        'country' => NULL,
        'phone' => NULL,
        'mail' => NULL,
        'created_at' => NULL
    );

    const ADDITIONAL_INPUTS = array(
        'company' => NULL,
        'position' => NULL,
        'about' => NULL,
        'photo' => NULL,
        'created_at' => NULL
    );

    public function __construct()
    {
    }

    public function checkEmail($mail)
    {
        $result = ajaxModel::checkMail($mail);
        return $result;
    }

    public function saveMember()
    {
        if (!ajaxModel::checkMail($_POST['mail'])) {
            $inputsArr = self::DEFAULT_INPUTS;
            foreach ($_POST as $key => $value) {
                if ($key == 'birthdate') $value = strtotime($value);
                if ($key == 'update') continue;
                $inputsArr[$key] = htmlspecialchars($value, ENT_QUOTES);
            }
            $result = @ajaxModel::addMember($inputsArr);
            if ($result) {
                $response = array(
                    "database" => "Data has been successfully saved",
                    "id" => $result
                );
            } else {
                $response = array(
                    "database" => "Data cannot be saved, please try again later",
                );
            }
        } else {
            $response = array(
                "database" => "Email is already registered",
            );
        }
        echo json_encode($response);
    }

    public function updateMember()
    {
        $inputsArr = self::DEFAULT_INPUTS;
        $mail = '';
        foreach ($_POST as $key => $value) {
            if ($key == 'birthdate') $value = strtotime($value);
            if ($key == 'mail') $mail = $value;
            if ($key == 'update') continue;
            $inputsArr[$key] = htmlspecialchars($value, ENT_QUOTES);
        }
        $result = @ajaxModel::updateMember($inputsArr, $mail);
        if ($result) {
            $response = array(
                "database" => "Data has been successfully saved",
                "id" => $result
            );
        } else {
            $response = array(
                "database" => "Data cannot be saved, please try again later",
            );
        }
        echo json_encode($response);
    }

    public function sendData()
    {
        $mailExists = ajaxModel::checkMailUpdate($_POST['mail']);
        if ($_POST['update'] == 1 && $mailExists) {
            $this->updateMember();
        } else {
            $this->saveMember();
        }
    }

    public function addInfo($inputsArr, $id){
        $result = ajaxModel::addInfoMember($inputsArr, $id);
        if ($result) {
            return "Data has been successfully added";
        } else {
            return "Data cannot be saved, please try again later";
        }
    }

    public function addData()
    {
        $id = $_POST['id'];
        $inputsArr = self::ADDITIONAL_INPUTS;
        foreach ($_POST as $key => $value) {
            if ($key == 'birthdate') $value = strtotime($value);
            if ($key == 'photo' && $value == 'undefined') $value = '';
            $inputsArr[$key] = htmlspecialchars($value, ENT_QUOTES);
        }
        $response = array();
        // saving file to server
        $size = 0;
        $photo = false;
        if(!empty($_FILES)) {
            $size = $_FILES["photo"]["size"];
            $photo = true;
        }
//        var_dump($check);
        $response["file"] = '';
        $max = 2 * 1048576;
        if ($size > 0 && $size < $max) {
            if (!empty($_FILES)) {
                $imageFileType = $_FILES["photo"]["type"];
                $target_dir = getcwd() . "/uploads/";
                $dbPath = md5(uniqid(rand(), true)) . "-" . basename($_FILES["photo"]["name"]);
                $target_file = $target_dir . $dbPath;
                $uploadOk = 1;
// Check if image file is a actual image or fake image
                $check = getimagesize($_FILES["photo"]["tmp_name"]);
                if ($check !== false) {
//                echo "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $response["file"] = "File is not an image. ";
                    $uploadOk = 0;
                }
// Check file size
                if ($_FILES["photo"]["size"] > 500000) {
                    $response["file"] += "Sorry, your file is too large. ";
                    $uploadOk = 0;
                }
// Allow certain file formats
                if ($imageFileType != "image/jpg" && $imageFileType != "image/png" && $imageFileType != "image/jpeg"
                    && $imageFileType != "image/gif") {
                    $response["file"] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed. ";
                    $uploadOk = 0;
                }
// Check if $uploadOk is set to 0 by an error
                if ($uploadOk == 0) {
                    $response["file"] += "Sorry, your file was not uploaded. ";
// if everything is ok, try to upload file
                } else {
//                if (!is_writable("/var/www/albedo-intern.loc/public_html/uploads")) {
//                    die('sorry the web server does not have permission to write to /var/www/albedo-intern.loc/public_html/uploads');
//                }
                    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
                        $inputsArr['photo'] = $dbPath;
                    } else {
                        $response["file"] += "File is not an image. ";
                    }
                }
            }
            $response["database"] = $this->addInfo($inputsArr, $id);
        } else if ( $size > $max && $photo == true) {
            $response["database"] = "Data cannot be saved, please try again";
            $response["file"] = "Your file is too large. Max size is 2 MB";
        } else {
            $response["database"] = $this->addInfo($inputsArr, $id);
            unset($response["file"]);
        }
        echo json_encode($response);
    }

    public function getAllNum()
    {
        echo ajaxModel::all();
    }
}

?>