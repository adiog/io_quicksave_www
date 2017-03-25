// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.



class Tag
{
    constructor(tagBean)
    {
        //super();
        let tag = this;
        this.tagBean = tagBean;

        this.delayAction = new DelayAction(
            'checkmark', null, function(){Tag.do_update(tag);},
            'undo', null, function(){Tag.undo(tag);},
            3000, 1000
        );

        this.dom = $$(FloatedSegment(), $$(div({class: 'ui two column grid'}),
            $$(div({class: 'middle aligned column'}), this.name = EditableText(this.tagBean.name, function(ev){Tag.update(tag);})),
            //$$(div({class: 'column'}), Text(' ')),
            $$(div({class: 'column'}), this.menu = Left($$(div({class: ''}), IconBasicButton('trash', function(ev) {Tag.remove(tag);}, 'mini negative'))))
        ));

        this.success = IconBasicButton('checkmark positive');
        this.loader = IconBasicButton('ui mini active inline loader');
    }

    static do_update(tag)
    {
        tag.tagBean.name = tag.name.innerHTML;

        if (tag.tagBean.tag_id != null)
        {
            API.tag_update(tag.tagBean, function(reply) {console.log(reply)});
        }
        else
        {
            API.tag_create(tag.tagBean, function(reply) {tag.tagBean.tag_id = reply['id']; console.log(reply)});
        }

        $SWAP(tag.loader, tag.success);
        setTimeout(
            function () {
                $SWAP(tag.success, tag.menu);
            },
            500
        );

    }

    static update(tag)
    {
        if (!tag.delayAction.isRunning)
        {
            $SWAP(tag.menu, tag.loader);
        }
        tag.delayAction.restart();
    }

    static undo(tag)
    {
    //    tag.dom.set_name(tag.bean.name);
      //  tag.dom.set_value(tag.bean.value);
    }

    static remove(tag)
    {
        if (tag.tagBean.tag_id != null)
        {
            API.tag_delete(tag.tagBean.tag_id, function(reply) {console.log(reply)});
        }
        tag.dom.parentNode.removeChild(tag.dom);
    }
}
