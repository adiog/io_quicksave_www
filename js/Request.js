// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function convert_get_method_parameters_to_url_suffix(parameters)
{
    let url_suffix = '';

    for(let key in parameters)
    {
        let parameter = key + '=' + encodeURIComponent(parameters[key]);

        if (url_suffix == '')
        {
            url_suffix += '?' + parameter;
        }
        else
        {
            url_suffix += '&' + parameter;
        }
    }

    return url_suffix;
}

function json_get(url, parameters, successCallback, failureCallback=null, errorCallback=null)
{
    let request = new XMLHttpRequest();
    let url_with_parameters = url + convert_get_method_parameters_to_url_suffix(parameters);

    request.open("GET", url_with_parameters, true);

    request.onload = function ()
    {
        if (this.status == 200)
        {
            successCallback(JSON.parse(this.responseText));
        }
        else if (failureCallback != null)
        {
            try
            {
                parsedResponseText = JSON.parse(this.responseText);
            }
            catch (e)
            {
                parsedResponseText = {'message': this.responseText};
            }
            failureCallback(parsedResponseText);
        }
        else {
            // silent failure
        }
    };

    request.onerror = function (e)
    {
        if (errorCallback != null)
        {
            errorCallback(e);
        }
    };

    request.withCredentials = true;

    request.send();
}

function json_post(url, parameters, successCallback, failureCallback=null, errorCallback=null)
{
    let request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function ()
    {
        if (this.status == 200)
        {
            successCallback(JSON.parse(this.responseText));
        }
        else if (failureCallback != null)
        {
            try
            {
                parsedResponseText = JSON.parse(this.responseText);
            }
            catch (e)
            {
                parsedResponseText = {'message': this.responseText};
            }
            failureCallback(parsedResponseText);
        }
        else
        {
            // silent failure
        }
    };

    request.onerror = function (e)
    {
        if (errorCallback != null)
        {
            errorCallback(e);
        }
    };

    request.withCredentials = true;

    request.send(JSON.stringify(parameters));
}

function basic_auth_json_post(username, password, url, parameters, successCallback, failureCallback=null, errorCallback=null)
{
    let request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

    request.onload = function ()
    {
        if (this.status == 200)
        {
            successCallback(JSON.parse(this.responseText));
        }
        else if (failureCallback != null)
        {
            try
            {
                parsedResponseText = JSON.parse(this.responseText);
            }
            catch (e)
            {
                parsedResponseText = {'message': this.responseText};
            }
            failureCallback(parsedResponseText);
        }
        else
        {
            // silent failure
        }
    };

    request.onerror = function (e)
    {
        if (errorCallback != null)
        {
            errorCallback(e);
        }
    };

    request.withCredentials = true;

    request.send(JSON.stringify(parameters));
}
