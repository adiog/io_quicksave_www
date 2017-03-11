// This file is a part of quicksave project.
// Copyright (c) 2016 Adam Morawski <poczta@adammorawski.pl>,
//                    Aleksander Gajewski <adiog@brainfuck.pl>.

const api_quicksave_io = 'http://api.quicksave.io';

function convert_get_method_parameters_to_url_suffix(parameters)
{
    var url_suffix = '?';

    for(key in parameters)
    {
        url_suffix += key + '=' + encodeURIComponent(parameters[key]) + '&';
    }

    return url_suffix;
}

var json_get = function (url, parameters, onload_callback) {
    var full_url = url + convert_get_method_parameters_to_url_suffix(parameters);
    var request = new XMLHttpRequest();
    request.open('GET', full_url, true);
    request.onload = function () {
        onload_callback(JSON.parse(this.responseText));
    };
    request.send();
}

var json_post = function (url, parameters, onload_callback) {
    var request = new XMLHttpRequest();//{mozSystem: true});
    console.log(api_quicksave_io + url);
    request.open('POST', api_quicksave_io + url, true);
    request.onload = function () {
        onload_callback(JSON.parse(this.responseText));
    };
    request.withCredentials = true;
    request.send(JSON.stringify(parameters));
}

