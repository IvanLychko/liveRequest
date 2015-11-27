<?php defined('SYSPATH') or die('No direct script access.');
Route::set('nodejs', 'NodeJs')
->defaults(array(
    'controller' => 'nodeJs',
    'action'     => 'index',
));        
