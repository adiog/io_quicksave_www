// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function TagMenuDom(tag)
{
    dom = Left(document.createElement('div'));

    dom.appendChild(Right(IconButton('trash', function(ev) {Tag.remove(tag);}, 'negative')));
    dom.appendChild(Right(tag.delayAction.dom));

    dom.style.overflow = 'hidden';
    dom.style.MozTransform = 'scale(0.7)';
    return dom;
}


class TagDom
{
    constructor(tag)
    {
        this.uuid = UUID();

        this.tag = tag;

        this.dom = document.createElement('div');

        this.name = Left(EditableText('', function(ev){Tag.update(tag);}));
        this.dom.appendChild(this.name);

        this.value = Left(EditableText('', function(ev){Tag.update(tag);}));
        this.dom.appendChild(this.value);

        this.dom.appendChild(Left(TagMenuDom(tag)));

        this.dom.className = 'tag';
    }

    get()
    {
        return this.dom;
    }

    set_name(name)
    {
        this.name.innerHTML = name;
    }

    get_name()
    {
        return this.name.innerHTML;
    }

    set_value(value)
    {
        this.value.innerHTML = value;
    }

    get_value()
    {
        return this.value.innerHTML;
    }
}


class Tag
{
    constructor(tagBean)
    {
        //super();
        let tag = this;
        this.bean = tagBean;
        this.delayAction = new DelayAction(
            'checkmark', null, function(){Tag.do_update(tag);},
            'undo', null, function(){Tag.undo(tag);},
            5000, 1000, function(_x,_y){}
        );
        this.dom = new TagDom(this);
        this.dom.set_name(this.bean.name);
        this.dom.set_value(this.bean.value);
    }

    static do_update(tag)
    {
        tag.bean.name = tag.dom.get_name();
        tag.bean.value = tag.dom.get_value();

        data = {tag: tag.bean};

        if (tag.bean.tag_id != null)
        {
            API.tag_update(tag.bean, function(reply) {console.log(reply)});
        }
        else
        {
            API.tag_update(tag.bean, function(reply) {tag.bean.tag_id = reply['id']; console.log(reply)});
        }
    }

    static update(tag)
    {
        tag.delayAction.restart();
    }

    static undo(tag)
    {
        tag.dom.set_name(tag.bean.name);
        tag.dom.set_value(tag.bean.value);
    }

    static remove(tag)
    {
        if (tag.bean.tag_id != null)
        {
            data = {tag_id: tag.bean.tag_id};
            json_post('/tag/delete/', data, function(reply) {console.log(reply)});
        }
        tag.dom.get().parentNode.removeChild(tag.dom.get());
    }
}
