// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function EcmaItemDom(ecmaItem)
{
    return $$(Segment({style: 'width: 70%; margin: 20px auto;'}),
                $$(Segment({style: 'overflow: hidden'}),
                    ecmaItem.domIcon = Left(div({style: 'overflow: hidden'})),
                    ecmaItem.domName = EditableText(ecmaItem.metaBean.name)
                ),
                $$(Segment(),
                    ecmaItem.domText = EditableText(ecmaItem.metaBean.text)
                ),
                ecmaItem.domPlug = div(),
                ecmaItem.tagSegmentWrap = $$(ClearingSegment({style: 'display: none;'}), ecmaItem.tagSegment = $$(div({class: 'ui container', style: 'text-align: center; overflow: hidden;'}))),
                ecmaItem.menu = $$(Segment({style: 'overflow: hidden'}),
                    Right(IconBasicButton('trash', function(ev) {EcmaItem.remove(ecmaItem);}, 'negative')),
                    Right(IconBasicButton('secondary hashtag', function(ev) {EcmaItem.addtag(ecmaItem);})),
                    Right(ecmaItem.delayAction.dom)
                )
            );



    /*
        //dom.style.overflow = 'hidden';
        //return dom;
        this.dom.appendChild(this.icon);

        this.item = document.createElement('div');
        this.item.className = 'content';





        this.dom.appendChild(this.item);
        this.dom.appendChild(this.tags);


        this.menu = ItemMenuDom(ecmaItem);
        this.dom.appendChild(this.menu);*/
}

class EcmaItem {
    constructor(itemBean) {
        let ecmaItem = this;
        this.item = itemBean;
        this.itemBean = itemBean;
        this.metaBean = itemBean.meta;

        this.plugin = pluginEngine.matchPlugin(this);


        this.delayAction = new DelayAction(
            'checkmark', 'Save', function () {
                EcmaItem.do_update(item)
            },
            'undo', 'Undo', function () {
                EcmaItem.do_revert(item)

            }
        );

        this.dom = EcmaItemDom(this);
        this.domIcon.appendChild(this.plugin.icon(this));
        this.domName.class = this.domName.class + ' middle aligned content';

        this.domName.addEventListener('keyup', function(ev){EcmaItem.update(ecmaItem);});
        this.domText.addEventListener('keyup', function(ev){EcmaItem.update(ecmaItem);});

        let pluginSegmentContent = this.plugin.display(this);
        if (pluginSegmentContent) {
            this.domPlug.appendChild($$(Segment(), pluginSegmentContent));
        }

        this.plugin.menu(this, this.menu);

        for (let tagIndex in this.item.tags) {
            let tag = new EcmaTag(this.item.tags[tagIndex]);
            this.tagSegmentWrap.style.display = 'block';
            this.tagSegment.appendChild(tag.dom);
        }

        hidePrettyPrint();

        showPrettyPrint();

    }

    static addtag(ecmaItem) {
        console.log('adding tag');
        let tag = new EcmaTag({
            'user_hash': ecmaItem.item.meta.user_hash,
            'meta_hash': ecmaItem.item.meta.meta_hash,
            'name': 'newtag',
            'value': ''
        });
        //this.tags.push(tag);
        ecmaItem.tagSegmentWrap.style.display = 'block';
        ecmaItem.tagSegment.appendChild(tag.dom);
    }

    static remove(ecmaItem) {

        console.log('try to remove');

        let trash;
        let cancel;

        let confirm = $$(div({class: 'ui basic modal'}),
            $$(div({class: 'ui icon header'}),
                i({class: 'trash icon'}),
                Text('Remove item')
            ),
            $$(div({class: 'content'}),
                $$$(p(), 'Are you sure you want to delete the item?')
            ),
            $$(div({class: 'actions'}),
                cancel = $$(div({class: 'ui green basic inverted button'}),
                    i({class: 'cancel icon'}),
                    Text('No')
                ),
                trash = $$(div({class: 'ui red inverted button'}),
                    i({class: 'trash icon'}),
                    Text('Yes')
                )
            )
        );

        document.body.appendChild(confirm);
        $(confirm).modal('show');

        $BIND(trash, 'click', function() {
            let meta_hash = ecmaItem.itemBean.item.meta_hash;
            API.item_delete(meta_hash, function (reply) {
                $(confirm).modal('hide');
                confirm.parentNode.removeChild(confirm);
                ecmaItem.dom.parentNode.removeChild(ecmaItem.dom);
            });
        });

        $BIND(cancel, 'click', function () {
            $(confirm).modal('hide');
            confirm.parentNode.removeChild(confirm);
        });
    }

    hasTag(tagName) {
        console.log(tagName);
        return this.itemBean.tags.some(function (tag) {
            return tag.name === tagName;
        });
    }

    static do_update(ecmaItem) {
        ecmaItem.metaBean.name = ecmaItem.title.innerHTML;
        //item.bean.item_type = ecmaItem.dom.get_item_type();
        ecmaItem.metaBean.text = ecmaItem.freetext.innerHTML;

        API.meta_update(ecmaItem.metaBean, function (reply) {
                console.log(reply)
            });
    }

    static do_revert(ecmaItem) {
        ecmaItem.domName.innerHTML = ecmaItem.metaBean.name;
        ecmaItem.domText.innerHTML = ecmaItem.metaBean.text;

        API.meta_update(ecmaItem.metaBean, function (reply) {
            console.log(reply)
        });
    }

    static update(ecmaItem)
    {
        ecmaItem.delayAction.restart();
    }
}