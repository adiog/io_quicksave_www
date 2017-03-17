function convert_get_method_parameters_to_url_suffix(parameters)
{
    let url_suffix = '?';

    for(let key in parameters)
    {
        url_suffix += key + '=' + encodeURIComponent(parameters[key]) + '&';
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

if(document.getSelection)
{
    s=document.getSelection();
    item_type = 'selection';
}
else
{
    s='';
    item_type = 'page';
}

const api_url = 'http://api.quicksave.io';
const item_create_request_url = host_url + '/create/';

let item_create_request_data = {
    'item': {
        'item_type': item_type,
        'title': document.title,
        'freetext': s,
        'source_url': location.href,
        'source_title': document.title
    }
};

function notify_success(msg) {
    console.log(msg);
}

let success_callback = function(data)
{
    if (data.item.item_id > 0)
    {
        notify_success('Item was saved (item_id: ' + data.item.item_id + ').');
    }
    else
    {
        notify_failure('Item was not saved (' + data.message + ').');
    }
}

json_get(item_create_request_url, {body: JSON.serialize(item_create_request_data)}, success_callback);