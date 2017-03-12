var API = {
    login:
    function(name, pass)
    {

    },

    logout:
    function()
    {

    },

    status:
    function()
    {

    },

    create:
    function()
    {

    },

    retrieve:
    function(success_callback, query)
    {
        json_post('/retrieve/', {'query': query}, success_callback);
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
