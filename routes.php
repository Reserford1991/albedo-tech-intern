<?php
function call($controller, $action)
{
    // require the file that matches the controller name
    require_once('controllers/' . $controller . 'Controller.php');

    // create a new instance of the needed controller
    switch ($controller) {
        case 'pages':
            // we need the model to query the database later in the controller
            require_once('models/membersModel.php');
            $controller = new PagesController();
            break;
        case 'ajax':
            // we need the model to query the database later in the controller
            require_once('models/ajaxModel.php');
            $controller = new AjaxController();
            break;
    }
    // call the action
    $controller->{$action}();
}

// just a list of the controllers we have and their actions
// we consider those "allowed" values
$controllers = array('pages' => ['home', 'form2', 'table', 'error'],
    'ajax' => ['sendData', 'addData', 'getAllNum']);

// check that the requested controller and action are both allowed
// if someone tries to access something else he will be redirected to the error action of the pages controller
if (array_key_exists($controller, $controllers)) {
    if (in_array($action, $controllers[$controller])) {
        call($controller, $action);
    } else {
        call('pages', 'error');
    }
} else {
    call('pages', 'error');
}
?>