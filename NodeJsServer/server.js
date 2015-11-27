var args = process.argv.slice(2);
// проверим аргументы: путь к файлу и порт
if (args.length != 1) {
    console.log('Не верные аргументы!');
    return;
}

var XMLHttpRequest = require("./XMLHttpRequest").XMLHttpRequest;

var config = {
    Authorization : 'Basic bDByZW06QHNtYW4zMyE=',
};
var client = [];

function start(){
    var http = require('http');
    server = http.createServer(function(req,res){
        if(req.method == 'POST'){
            res.timeout = 0;
            res.writeHead(200, {'Access-Control-Allow-Origin': '*'});   
            req.on("data", function(post){
                var post = JSON.parse(post.toString());
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(this.readyState == 4){
                        if(this.status == 200){
                            phpRes = JSON.parse(this.responseText);  
                            if(phpRes.status === true){
                                hendler(req,res,phpRes);  
                            }else{
                                res.write('error data send!!!');
                                res.end();
                            }
                        }else{
                            console.log(this.status+' php server Error!!!');
                            if(this.status == 500){
                                console.log(this.responseText); 
                            }
                        } 
                    }
                };
                xhr.open('POST', 'http://dev.inrepublic.com.ua/NodeJs', true);
                xhr.setRequestHeader('Authorization', config.Authorization);
                post.keyToPhp = "hip;dmsd;!sdfvpdfvldlpdmp+95988486!!dfvd84";
                xhr.send(JSON.stringify(post));
            });
        }else{
            res.write('error data send!!!');
            res.end();
        }

    });
    server.timeout = 0; 
    server.listen(args[0], '185.65.244.65'); 
}

function hendler(req,res,php){
    switch(php.command){
        case 'addLisener':{
            client[php.user.id] = {
                user : php.user, 
                req  : req,
                res  : res,
            };

            client[php.user.id].req.id = php.user.id;
            client[php.user.id].req.on('close',function(){
                delete(client[this.id]);
            });

            break;
        }
        case 'sendMsg':{
            if(typeof client[php.data.whom] !== 'undefined'){
                client[php.data.whom].res.write(JSON.stringify({
                    command:php.command,
                    msg:php.data.msg
                }));
                client[php.data.whom].res.end();
            }


            res.end(); 
            break;   
        }
    }
} 

start();