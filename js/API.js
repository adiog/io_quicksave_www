// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function json_post_api(url, parameters, onloadCallback, failureCallback=null)
{
    localStorageWithItem(
        'api.quicksave.io',
        function(api_quicksave_io)
        {
            return function()
            {
                json_post(api_quicksave_io + url, parameters, onloadCallback, failureCallback);
            }
        }
    );
}

function basic_auth_json_post_api(username, password, url, parameters, onloadCallback, failureCallback=null)
{
    localStorageWithItem(
        'api.quicksave.io',
        function(api_quicksave_io)
        {
            return function()
            {
                basic_auth_json_post(username, password, api_quicksave_io + url, parameters, onloadCallback, failureCallback);
            }
        }
    );
}

const API = {
    login:
    function(username, password, successCallback, failureCallback=null)
    {
        basic_auth_json_post_api(username, password, '/login/', {}, successCallback);
    },

    logout:
    function(successCallback, failureCallback=null)
    {
        json_post_api('/logout/', {}, successCallback, failureCallback);
    },

    status:
    function(successCallback, failureCallback=null)
    {
        json_post_api('/status/', {}, successCallback, failureCallback);
    },

    create:
    function(item, successCallback)
    {
        json_post_api('/create/', {'item': item}, successCallback);
    },

    retrieve:
    function(success_callback, query)
    {
        json_post_api('/retrieve/', {'query': query}, success_callback);
    },

    item_update:
    function()
    {
        //todo
    },

    item_delete:
    function()
    {

    },

    tag_create:
    function()
    {

    },

    tag_update:
    function()
    {

    },

    tag_delete:
    function()
    {

    }
};
