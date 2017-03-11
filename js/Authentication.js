const api_url = 'http://api.quicksave.io';

function convert_get_method_parameters_to_url_suffix(parameters)
{
    var url_suffix = '?';

    for(key in parameters)
    {
        url_suffix += key + '=' + encodeURIComponent(parameters[key]) + '&';
    }

    return url_suffix;
}

function qslogin()
{
    let method = 'POST';
    let fullurl = api_url + '/login/';
    let username = 'adiog';
    let password = 'pass';
    let data = {'name': username, 'pass': password};

    let req = new XMLHttpRequest();

    req.open("POST", fullurl/* + convert_get_method_parameters_to_url_suffix(data)*/, true);
    req.setRequestHeader("Authorization",
        "Basic " + btoa(username + ":" + password));

    req.onload = function () {
        console.log(this.responseText);
    };

    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            //alert(req.responseText);
        }
    };

    req.withCredentials = true;

    req.send(JSON.stringify({}));
}

function qslogout()
{
    var method = 'POST';
    var fullurl = api_url + '/logout/';
    var data = {};

    var req = new XMLHttpRequest();

    req.open(method, fullurl, true);

    req.onload = function () {
        console.log(this.responseText);
    };


    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
            //alert(req.responseText);
        }
    };
    req.withCredentials = true;

    req.send(JSON.stringify(data));
}

function Authentication()
{
    document.body.appendChild(LabeledIconButton('sign in', 'login', qslogin));
    document.body.appendChild(LabeledIconButton('sign out', 'logout', qslogout));
}