<?php
class Controller_NodeJs extends Controller_Template{

    public function action_index(){
        $post = json_decode(file_get_contents("php://input"));
        if(isset($post->keyToPhp) && $post->keyToPhp == 'hip;dmsd;!sdfvpdfvldlpdmp+95988486!!dfvd84'){
            if(NodeJs::instance()->isValidData($post)){
                $id = Memcach::instance()->get(unserialize(base64_decode(explode('%7E', $post->cookie, 2)[1]))['auth']);
                $user = Auth::instance()->getAllInfoToUserByIdOrThis($id);

                $data = (object)array(
                    'status'  => false,
                    'user'    => $user,
                    'data'    => $post->data,
                    'command' => $post->command,
                );
                switch($data->command){
                    case 'addLisener':{
                        $data->status = true;
                        die(json_encode($data));
                    }
                    case 'sendMsg':{
                        $data->status = true;
                        die(json_encode($data));
                    }
                } 
            }else{
                die(json_encode(false));
            }  
        }
    }
}    
