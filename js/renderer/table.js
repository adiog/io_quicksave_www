// This file is a part of quicksave project.
// Copyright (c) 2016 Adam Morawski <poczta@adammorawski.pl>,
//                    Aleksander Gajewski <adiog@brainfuck.pl>.


var table_renderer = function(renderer_layout)
{
    if (renderer_layout)
    {
        this.layout = renderer_layout;
    }
    else
    {
        this.layout = ['meta_hash', 'title', 'freetext', 'source_title', 'source_url', 'timestamp'];
    }

    this.get_item_dom_layout =
    function()
    {
        return this.layout;
    };

    this.get_container_dom_layout =
    function()
    {
        return this.layout;
    };

    this.create_container_dom =
    function(container_dom_layout)
    {
        var container_dom = document.createElement('table');
        container_dom.className = 'container_dom_table';

        var header_row = document.createElement('tr');
        for(var index in container_dom_layout)
        {
            var header_cell = document.createElement('th');
            header_cell.innerHTML = container_dom_layout[index];
            header_row.appendChild(header_cell);
        }
        container_dom.appendChild(header_row);

        return container_dom;
    };

    this.convert_item_json_to_item_dom =
    function(item_json_, item_dom_layout)
    {
        var item_dom = document.createElement('tr');

        var tags = item_json_['tags'];
        var item_json = item_json_['item'];

        for(var index in item_dom_layout)
        {
            var column_name = item_dom_layout[index];
            var item_cell_dom = document.createElement('td');
            if (item_dom_layout.indexOf(column_name) >= 0) {
                item_cell_dom.innerHTML = item_json[column_name];
            } else {
                item_cell_dom.innerHTML = tags[column_name];
            }
            item_dom.appendChild(item_cell_dom);
        }

        return item_dom;
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

