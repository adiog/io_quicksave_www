var API = {
    retrieve:
    function(success_callback, query)
    {
        json_post('/retrieve/', {'query': query}, success_callback);
    }
};
