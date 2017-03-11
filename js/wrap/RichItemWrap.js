// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function ItemMenuDom(item)
{
    dom = document.createElement('div');

    dom.appendChild(Right(IconButton('trash', function(ev) {RichItem.remove(item);}, 'negative')));
    dom.appendChild(Right(IconButton('hashtag', function(ev) {RichItem.addtag(item);})));
    dom.appendChild(Right(IconButton('asterisk', function(ev) {item.delayAction.restart();})));
    dom.appendChild(Right(item.delayAction.dom));

    dom.style.overflow = 'hidden';
    return dom;
}

class RichItemDom
{
    constructor(richItem)
    {
        this.uuid = UUID();

        this.richItem = richItem;

        this.dom = document.createElement('div');
        this.dom.className = 'richItem';

        this.icon = document.createElement('div');
        this.icon.style.overflow = 'hidden'
        this.dom.appendChild(this.icon);

        this.item = document.createElement('div');
        this.item.className = 'content';

        this.tags = document.createElement('div');

        this.display = document.createElement('div');
        this.dom.appendChild(this.display);



        this.dom.appendChild(this.item);
        this.dom.appendChild(this.tags);


        this.menu = ItemMenuDom(richItem);
        this.dom.appendChild(this.menu);
    }

    get()
    {
        return this.dom;
    }

    set_icon(icon) {
        this.icon.appendChild(icon);
    }

    set_display(dom_display)
    {
        this.display.appendChild(dom_display);
    }

    set_item(item) {
        this.item.appendChild(item);
    }

    add_tag(tag) {
        this.tags.appendChild(tag);
    }
}

class RichItem
{
    constructor(richItemBean)
    {
        //super();
        this.bean = richItemBean;

        this.plugin = pluginEngine.matchPlugin(this);

        this.delayAction = new DelayAction(
            'checkmark', 'Save', function(){console.log('success');},
            'undo', 'Undo', function(){console.log('cancel');}
        );
        this.dom = new RichItemDom(this);
        this.dom.dom.style.overflow = 'hidden';
        this.dom.set_icon(Left(this.plugin.icon(this)));

        this.dom.set_display(this.plugin.display(this));

        this.item = new Item(richItemBean.item);
        this.dom.set_item(this.item.dom.get());

        this.plugin.menu(this, this.dom.menu);

        this.tags = new Array();
        for(var indexTag in richItemBean.tags)
        {
            let tag = new Tag(richItemBean.tags[indexTag]);
            this.tags.push(tag);
            this.dom.add_tag(tag.dom.get());
        }
    }

    static addtag(richItem)
    {
        console.log('adding tag');
        let tag = new Tag({'user_id': richItem.bean.item.user_id, 'item_id': richItem.bean.item.item_id, 'name': 'newtag', value: 'value'});
        //this.tags.push(tag);
        richItem.dom.add_tag(tag.dom.get());
    }

    static remove(richItem)
    {
        richItem.delayAction.stop();
        richItem.dom.get().parentNode.removeChild(richItem.dom.get());
        data = {item_id: richItem.bean.item.item_id};
        json_post('/item/delete/', data, function(reply) {console.log(reply)});
    }

    hasTag(tagName)
    {
        console.log(tagName);
        return this.bean.tags.some(function(tag) {return tag.name == tagName});
    }
}