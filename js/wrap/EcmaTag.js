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
/*
        this.dom = //$$(FloatedSegment(),
            $$(div({class: 'ui two column grid'}),
            $$(div({class: 'middle aligned column'}), this.name = EditableText(this.tagBean.name, function(ev){EcmaTag.update(ecmaTag);})),
            $$(div({class: 'column'}), this.menu = Left($$(div({class: ''}), IconBasicButton('trash', function(ev) {EcmaTag.remove(ecmaTag);}, 'mini negative'))))
    //    )
    );
*/

        let name_value = this.tagBean.name;
        if (this.tagBean.value !== '')
        {
            name_value = name_value + '#' + this.tagBean.value;
        }

        let colors = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black'];
        let color = '';
        if (tagBean.tag_hash === '') {
            color = 'black';
        }
        for(let colorIndex in colors) {
            if (name_value.indexOf(colors[colorIndex]) !== -1) {
                color = colors[colorIndex];
            }
        }

        this.dom = $$(div({class: 'ui ' + color + ' right basic label', style: 'text-align: left;'}),
        this.name_value = EditableText(this.tagBean.name, function(ev){EcmaTag.update(ecmaTag);}),
        this.trash = Icon('delete')
    );

        //his.dom = $$(button({class: 'ui right labeled icon basic button', contentEditable: true}),


        $BIND(this.trash, 'click', function(ev) {EcmaTag.remove(ecmaTag);});
        //dom.appendChild(Text(label));
        //if (callback !== null)

        this.success = IconBasicButton('checkmark positive');
        this.loader = IconBasicButton('ui mini active inline loader');
    }

    static do_update(ecmaTag)
    {
        let name_value = ecmaTag.name_value.innerHTML;
        let split = name_value.split('#');

        ecmaTag.tagBean.name = split[0];
        if (split.length > 1) {
            ecmaTag.tagBean.value = (Array(split).shift()).join('#');
        }



        if (ecmaTag.tagBean.tag_hash !== '')
        {
            API.tag_update(ecmaTag.tagBean, function(reply) {
                ecmaTag.dom.className = 'ui right basic label';
                console.log(reply)});
            let colors = [
                'red',
                'orange',
                'yellow',
                'olive',
                'green',
                'teal',
                'blue',
                'violet',
                'purple',
                'pink',
                'brown',
                'grey',
                'black'];
            for(let colorIndex in colors) {
                console.log(name_value, colors[colorIndex]);
                if (name_value.indexOf(colors[colorIndex]) !== -1) {
                    ecmaTag.dom.className = ecmaTag.dom.className.replace('ui', 'ui ' + colors[colorIndex]);
                }
            }
        }
        else
        {
            API.tag_create(ecmaTag.tagBean, function(reply) {
                ecmaTag.tagBean.tag_hash = reply['hash'];
                console.log(reply);
                ecmaTag.dom.className = ecmaTag.dom.className.replace('black', '');
                let colors = [
                    'red',
                    'orange',
                    'yellow',
                    'olive',
                    'green',
                    'teal',
                    'blue',
                    'violet',
                    'purple',
                    'pink',
                    'brown',
                    'grey',
                    'black'];
                for(let colorIndex in colors) {
                    console.log(name_value, colors[colorIndex]);
                    if (name_value.indexOf(colors[colorIndex]) !== -1) {
                        ecmaTag.dom.className = ecmaTag.dom.className.replace('ui', 'ui ' + colors[colorIndex]);
                    }
                }
            });
        }


        //$SWAP(ecmaTag.loader, ecmaTag.success);
        //setTimeout(
         //   function () {
         //       $SWAP(ecmaTag.success, ecmaTag.menu);
         //   },
        //    500
        //);

    }

    static update(ecmaTag)
    {
        if (!ecmaTag.delayAction.isRunning)
        {
         //   $SWAP(ecmaTag.menu, ecmaTag.loader);
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
        if (ecmaTag.tagBean.tag_hash !== '')
        {
            API.tag_delete(ecmaTag.tagBean.tag_hash, function(reply) {console.log(reply)});
        }
        let par = ecmaTag.dom.parentNode;
        ecmaTag.dom.parentNode.removeChild(ecmaTag.dom);
        if (!par.hasChildNodes())
        {
            $(par).hide();
        }
    }
}
