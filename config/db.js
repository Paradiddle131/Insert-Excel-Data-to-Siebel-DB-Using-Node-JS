var fs = require('fs');

exports.saveUser = function (data){
    console.log("data -> " + JSON.parse(data));
    console.log("data -> " + JSON.parse(data)[0]);
    fs.readFile('data/users.json', function (err) {
        if (!err){
            var data_json = JSON.parse(data);
            data_json.push(data);
            fs.writeFile("data/users.json", JSON.stringify(data_json));
        } else {
            throw err;
        }
    })
}

exports.getUser = function(user,cb)
{
    fs.readFile('data/users.json','utf8',function(err,data)
    {
        if(err)
            cb(err,null);
        else
        {
            try
            {
                var users = JSON.parse(data);
                if(users[user] != undefined)
                {
                    cb(null,users[user]);
                }
                else
                {
                    cb(null);
                }
            }
            catch(e)
            {
                cb(e,null)
            }
        }
    })
}