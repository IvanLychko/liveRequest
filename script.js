function liveRequest (command,data,callback){
    if(typeof command !== 'undefined'){
        if(typeof data !== 'object'){
            data = {};
        }else if(typeof data === 'function'){
            callback = data; 
        }
        if(typeof callback !== 'function' && command == 'addLisener'){
            callback = function(data){
                if(data.statusText == 'OK'){
                    if(data.responseText == 'error data send!!!'){
                        console.log(data.responseText);
                        return; 
                    }
                    hendlerRespons(JSON.parse(data.responseText),function(){
                        liveRequest('addLisener');                            
                    });

                }else{
                    liveRequest('addLisener'); 
                }
            } 
        }else{
            callback = function(){}; 
        } 
          $.ajax({
            type: "POST",
            url: 'http://185.65.244.65:8121',
            data: JSON.stringify({
                command: command, 
                cookie : document.cookie,
                data   : data
            }),
            dataType: "json",
            complete: function(res){
                callback(res)   
            },
        });
    }else{
        console.error('No command!!!');
    }
};

// hendled respons long pulling
function hendlerRespons(respons,callback){
    switch(respons.command){
        case 'sendMsg':{
            console.log(respons.msg);
            break;
        }
    }
    callback();
};

// add lisener (obligatorily)
liveRequest('addLisener');

/**                           
* examle use send long pulling
* 
* @ivan lychko
*/
// liveRequest('sendMsg',{msg:'привет',whom:31});
// liveRequest('sendMsg',function(res){console.log(res);});
// liveRequest('sendMsg',{msg:'привет',whom:31},function(res){console.log(res);});