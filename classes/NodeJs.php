<?php
class NodeJs{
    private static $_instance = null;

    public static function instance(){
        if (self::$_instance === null) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }
    
    public function isValidData(){
         return true;
    }
    
    public function getUser($cookie){
        $id = Memcach::instance()->get(unserialize(base64_decode(explode('%7E', $cookie, 2)[1]))['auth']);
        $user = Auth::instance()->getAllInfoToUserByIdOrThis($id);
        return $user;
    }
}