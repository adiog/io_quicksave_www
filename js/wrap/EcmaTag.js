// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

class EcmaTag
{
    constructor(tagBean)
    {
        let ecmaTag = this;
        this.tagBean = tagBean;

        this.delayAction = new DelayAction(
            'checkmark', null, function(){EcmaTag.do_update(ecmaTag);},
            'undo', null, function(){EcmaTag.undo(ecmaTag);},
            3000, 1000
        );

        this.dom = $$(FloatedSegment(), $$(div({class: 'ui two column grid'}),
            $$(div({class: 'middle aligned column'}), this.name = EditableText(this.tagBean.name, function(ev){EcmaTag.update(ecmaTag);})),
            $$(div({class: 'column'}), this.menu = Left($$(div({class: ''}), IconBasicButton('trash', function(ev) {EcmaTag.remove(ecmaTag);}, 'mini negative'))))
        ));

        this.success = IconBasicButton('checkmark positive');
        this.loader = IconBasicButton('ui mini active inline loader');
    }

    static do_update(ecmaTag)
    {
        ecmaTag.tagBean.name = ecmaTag.name.innerHTML;

        if (ecmaTag.tagBean.tag_hash != null)
        {
            API.tag_update(ecmaTag.tagBean, function(reply) {console.log(reply)});
        }
        else
        {
            API.tag_create(ecmaTag.tagBean, function(reply) {ecmaTag.tagBean.tag_hash = reply['id']; console.log(reply)});
        }

        $SWAP(ecmaTag.loader, ecmaTag.success);
        setTimeout(
            function () {
                $SWAP(ecmaTag.success, ecmaTag.menu);
            },
            500
        );

    }

    static update(ecmaTag)
    {
        if (!ecmaTag.delayAction.isRunning)
        {
            $SWAP(ecmaTag.menu, ecmaTag.loader);
        }
        ecmaTag.delayAction.restart();
    }

    static undo(ecmaTag)
    {
    //    ecmaTag.dom.set_name(ecmaTag.bean.name);
      //  ecmaTag.dom.set_value(ecmaTag.bean.value);
    }

    static remove(ecmaTag)
    {
        if (ecmaTag.tagBean.tag_hash != null)
        {
            API.tag_delete(ecmaTag.tagBean.tag_hash, function(reply) {console.log(reply)});
        }
        ecmaTag.dom.parentNode.removeChild(ecmaTag.dom);
    }
}
