// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function RichItemDom(richItem)
{
    return $$(Segment({style: 'width: 70%; margin: 20px auto;'}),
                $$(Segment({style: 'overflow: hidden'}),
                    richItem.icon = Left(div({style: 'overflow: hidden'})),
                    richItem.title = EditableText(richItem.itemBean.title)
                ),
                $$(Segment(),
                    richItem.freetext = EditableText(richItem.itemBean.freetext)
                ),
                richItem.pluginSegment = div(),
                $$(Segment(), richItem.tagSegment = $$(div({class: 'ui center aligned container', style: 'overflow: hidden; display: none;'}))),
                $$(Segment({style: 'overflow: hidden'}),
                    Right(IconButton('trash', function(ev) {RichItem.remove(item);}, 'negative')),
                    Right(IconButton('hashtag', function(ev) {RichItem.addtag(richItem);})),
                    Right(richItem.delayAction.dom)
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


        this.menu = ItemMenuDom(richItem);
        this.dom.appendChild(this.menu);*/
}

class RichItem {
    constructor(richItemBean) {
        //super();

        let item = this;
        this.richItemBean = richItemBean;
        this.itemBean = richItemBean.item;

        this.plugin = pluginEngine.matchPlugin(this);


        this.delayAction = new DelayAction(
            'checkmark', 'Save', function () {
                RichItem.do_update(item)
            },
            'undo', 'Undo', function () {
                RichItem.do_revert(item)

            }
        );

        this.dom = RichItemDom(this);
        this.icon.appendChild(this.plugin.icon(this));
        this.title.class = this.title.class + ' middle aligned content';

        this.title.addEventListener('keyup', function(ev){RichItem.update(item);});
        this.freetext.addEventListener('keyup', function(ev){RichItem.update(item);});

        let pluginSegmentContent = this.plugin.display(this);
        if (pluginSegmentContent) {
            this.pluginSegment.appendChild($$(Segment(), pluginSegmentContent));
        }
        /*this.dom.dom.;




        this.item = new Item(richItemBean.item);
        this.dom.set_item(this.item.dom.get());

        this.plugin.menu(this, this.dom.menu);

        this.tags = new Array();
        for (var indexTag in richItemBean.tags) {
            let tag = new Tag(richItemBean.tags[indexTag]);
            this.tags.push(tag);
            this.dom.add_tag(tag.dom.get());
        }
        hidePrettyPrint();

        showPrettyPrint();
        */
    }

    static addtag(richItem) {
        console.log('adding tag');
        let tag = new Tag({
            'user_id': richItem.itemBean.user_id,
            'item_id': richItem.itemBean.item_id,
            'name': 'newtag',
            'value': ''
        });
        //this.tags.push(tag);
        richItem.tagSegment.style.display = 'block';
        richItem.tagSegment.appendChild(tag.dom);
    }

    static remove(richItem) {
        //richItem.delayAction.stop();
        //richItem.dom.get().parentNode.removeChild(richItem.dom.get());
        data = {item_id: richItem.bean.item.item_id};
        json_post('/item/delete/', data, function (reply) {
            console.log(reply)
        });
    }

    hasTag(tagName) {
        console.log(tagName);
        return this.richItemBean.tags.some(function (tag) {
            return tag.name == tagName
        });
    }

    static do_update(item) {
        item.itemBean.title = item.title.innerHTML;
        //item.bean.item_type = item.dom.get_item_type();
        item.itemBean.freetext = item.freetext.innerHTML;

        API.item_update(item.itemBean, function (reply) {
                console.log(reply)
            });
    }

    static do_revert(item) {
        item.title.innerHTML = item.itemBean.title;
        item.freetext.innerHTML = item.itemBean.freetext;

        API.item_update(item.itemBean, function (reply) {
            console.log(reply)
        });
    }

    static update(item)
    {
        item.delayAction.restart();
    }
}