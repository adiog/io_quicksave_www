// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.


var thumbs_renderer = function()
{
    this.get_item_dom_layout =
    function()
    {
        return null;
    };

    this.get_container_dom_layout =
    function()
    {
        return null;
    };

    this.create_container_dom =
    function(container_dom_layout)
    {
        var container_dom = document.createElement('div');
        container_dom.className = 'ui center aligned container';
        //container_dom.style = 'width: 100%; clear: both;';
        return container_dom;
    };

    this.convert_item_json_to_item_dom =
    function(item_json, item_dom_layout)
    {
        var i = document.createElement('div');
        i.style = 'margin: 20px auto;';
        let ecmaItem = new EcmaItem(item_json);
        i.appendChild(ecmaItem.domLayout);
        /*
        var item_dom = document.createElement('div');
        var bottom = document.createElement('div');

        var tags = item_json['tags'];
        item_json = item_json['item'];

        //item_dom.className = 'qs_item ' + item_json.item_type;
        item_dom.innerHTML = item_json.meta_hash + ': ' + item_json.title + ' [' + item_json.item_type + ']<hr/> ' + item_json.freetext + '<br/>';
        if (item_json.storage && (item_json.storage.length != 0)) {
            item_dom.innerHTML = item_dom.innerHTML + "<img width=\"500px\" src=\"/static/qs/" + item_json.storage[0].storage + "\">";
        }
        if (item_json.freetext.indexOf('youtube.com') != -1) {
            item_dom.innerHTML = item_dom.innerHTML + "<iframe width=\"420\" height=\"315\" src=\"" +
           item_json.freetext + "\"></iframe>";
        }
        if ((item_json.freetext.indexOf('.jpg') != -1) || (item_json.freetext.indexOf('.gif') != -1) || (item_json.freetext.indexOf('.png') != -1)) {
            item_dom.innerHTML = item_dom.innerHTML + "<img width=\"500px\" src=\"" + item_json.freetext + "\">";
        }

        new_tag = document.createElement('button');
        new_tag.innerHTML = 'add tag';
        new_tag.addEventListener('click', function (ev) {
            tag = new Tag({'user_hash': item_json.user_hash, 'meta_hash': item_json.meta_hash, 'name': 'newtag', value: 'value'});
            bottom.appendChild(tag.dom.get());
        });
        bottom.appendChild(new_tag);

        console.log(tags);
        for(tag_index in tags)
        {


                try {
                    tag = new Tag(tags[tag_index]);
                    //item_dom.innerHTML = item_dom.innerHTML + ' ' + print_tag(tags[tag_index]);
                    bottom.appendChild(tag.dom.get());
                } catch(e) {
                    return item_dom;
                }
        }

        item_dom.innerHTML = item_dom.innerHTML + ' <button onClick="api_bom_item_delete(shadow, ' + item_json.meta_hash + ')">Delete</button>';

        i.appendChild(item_dom);
        i.appendChild(bottom);
        */

            return i;
    };

    this.render_item_dom_on_container_dom =
    function(item_dom, container_dom, container_dom_layout)
    {
        container_dom.appendChild(item_dom);
        return container_dom;
    };


    this.finalize_container_dom =
    function(container_dom, container_dom_layout)
    {
        return container_dom;
    };
};
