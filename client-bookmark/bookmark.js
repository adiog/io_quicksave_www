const json_post = function (url, parameters, onload_callback) {
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function () {
        onload_callback(JSON.parse(this.responseText));
    };
    request.send(JSON.stringify(parameters));
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

json_post(item_create_request_url, item_create_request_data, success_callback);