function api_bom_item_retrieve(success_callback, data={})
{
    json_get('api_bom/item/retrieve/', data, success_callback);
}

function api_bom_item_delete(success_callback, item_id)
{
    json_post('api_bom/item/delete/', {'item_id': item_id}, success_callback);
}
