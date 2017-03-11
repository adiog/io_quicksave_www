// This file is a part of quicksave project.
// Copyright (c) 2016 Adam Morawski <poczta@adammorawski.pl>,
//                    Aleksander Gajewski <adiog@brainfuck.pl>.


function render_items(item_json_collection, renderer)
{
    var item_dom_layout = renderer.get_item_dom_layout();
    var container_dom_layout = renderer.get_container_dom_layout();

    var container_dom = renderer.create_container_dom(container_dom_layout);

    for(index in item_json_collection) {
        console.log(index);
        console.log(item_json_collection[index]);
        var item_dom = renderer.convert_item_json_to_item_dom(item_json_collection[index], item_dom_layout);
        container_dom = renderer.render_item_dom_on_container_dom(item_dom, container_dom, container_dom_layout);
    }

    var result = renderer.finalize_container_dom(container_dom, container_dom_layout);

    //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    return result;
}
