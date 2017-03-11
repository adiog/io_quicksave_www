// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

class ItemDom
{
    constructor(item)
    {
        this.uuid = UUID();

        this.item = item;

        this.dom = document.createElement('div');
        this.title = document.createElement('div');
        this.title.className = 'dotted';
        //this.item_type = document.createElement('div');
        //this.item_type.className = 'dotted';
        this.freetext = document.createElement('div');
        this.freetext.className = 'dotted';

        this.dom.appendChild(this.title);
      //  this.dom.appendChild(this.item_type);

        this.dom.appendChild(this.freetext);
        this.title.contentEditable = true;

        this.title.addEventListener('keyup', function(ev){Item.update(item);});
  //      this.item_type.contentEditable = true;

    //    this.item_type.addEventListener('keyup', function(ev){Item.update(item);});
        this.freetext.contentEditable = true;

        this.freetext.addEventListener('keyup', function(ev){Item.update(item);})
    }

    get()
    {
        return this.dom;
    }

    set_title(title) {
        this.title.innerHTML = title;
    }

    get_title() {
        return this.title.innerHTML;
    }
/*
    set_item_type(item_type) {
        this.item_type.innerHTML = item_type;
    }

    get_item_type() {
        return this.item_type.innerHTML;
    }
*/
    set_freetext(freetext) {
        this.freetext.innerHTML = freetext;
    }

    get_freetext()
    {
        return this.freetext.innerHTML;
    }
}

class Item
{
    constructor(itemBean)
    {
        //super();
        this.bean = itemBean;
        this.dom = new ItemDom(this);
        this.dom.set_title(this.bean.title);
        //this.dom.set_item_type(this.bean.item_type);
        this.dom.set_freetext(this.bean.freetext);
    }

    static update(item)
    {
        item.bean.title = item.dom.get_title();
        //item.bean.item_type = item.dom.get_item_type();
        item.bean.freetext = item.dom.get_freetext();

        data = {item: item.bean};

        if (item.bean.item_id != null)
        {
            json_post('/item/update/', data, function(reply) {console.log(reply)});
        }
        else
        {
            json_post('/item/create/', data, function(reply) { item.bean.item_id = reply['id']; console.log(reply)});
        }
    }
}
