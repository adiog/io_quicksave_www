// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function EcmaItemLayoutDom(ecmaItem)
{
    return $$(CenterAlignedSegmentContent({class: 'item'}),
        $$(Segment({class: 'item_icon_name'}),
            $$(Grid(),
                ecmaItem.domIcon = OneWideColumn({class: 'item_icon'}),
                ecmaItem.domName = MiddleAlignedColumn({class: 'item_name'}),
                ecmaItem.domUpperRight = OneWideColumn({class: 'time_upper_right'})
            )
        ),
        ecmaItem.domText = Segment({class: 'item_text'}),
        ecmaItem.domContent = Segment({class: 'item_content'}),
        ecmaItem.domTags = Segment({class: 'item_tags'}),
        ecmaItem.domMenu = $$(Segment({style: 'clear: both; overflow: hidden'}),
            ecmaItem.domLowerLeft = div({class: 'item_lower_left', style: 'float: left;'}),
            ecmaItem.domLowerRight = div({class: 'item_lower_right', style: 'float: right;'})
        )
    );
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
                EcmaItem.do_update(ecmaItem)
            },
            'undo', 'Undo', function () {
                EcmaItem.do_revert(ecmaItem)

            }
        );

        this.domStubWhileMaximized = div();

        let overlay = null;

        console.log(ecmaItem.itemBean.meta.meta_type);

        if (ecmaItem.itemBean.meta.meta_type === 'quicksave/book')
        {
            overlay = BookMetaType;
        }
        else if ((ecmaItem.itemBean.meta.meta_type === 'quicksave/code') || this.hasTag('code'))
        {
            overlay = CodeMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/file')
        {
            overlay = FileMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/image')
        {
            overlay = ImageMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/repo')
        {
            overlay = RepoMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/screenshot')
        {
            overlay = ScreenshotMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/text')
        {
            overlay = TextMetaType;
        }
        else if (ecmaItem.itemBean.meta.meta_type === 'quicksave/video')
        {
            overlay = VideoMetaType;
        }


        this.domLayout = EcmaItemLayoutDom(ecmaItem);
        document.body.appendChild(this.domFullscreen = $$(FullscreenModal(), this.domFullscreenContent = div({style: 'width: 100%; height: 100%;'})));

        $(this.domFullscreen)
            .modal({
                onApprove: function(){
                    $DEEPSWAP(ecmaItem.domLayout, ecmaItem.domFullscreenContent);

                    $(ecmaItem.domMinimize).show();
                    $(ecmaItem.domMaximize).hide();
                },
                onHide: function(){
                    $DEEPSWAP(ecmaItem.domLayout, ecmaItem.domFullscreenContent);

                    $(ecmaItem.domMinimize).hide();
                    $(ecmaItem.domMaximize).show();
                }
            });

        ecmaItem.domUpperRight.appendChild(ecmaItem.domMinimize = IconBasicButton('compress'));
        ecmaItem.domUpperRight.appendChild(ecmaItem.domMaximize = IconBasicButton('maximize'));

        $(ecmaItem.domMinimize).hide();

        $BIND(ecmaItem.domMinimize, 'click', function () {
            $(ecmaItem.domFullscreen).modal('hide');
        });

        $BIND(ecmaItem.domMaximize, 'click', function(ev) {
            $DEEPSWAP(ecmaItem.domLayout, ecmaItem.domFullscreenContent);
            $(ecmaItem.domFullscreen).modal('show');
            $(ecmaItem.domMinimize).show();
            $(ecmaItem.domMaximize).hide();
            setTimeout(function(){
            $(ecmaItem.domFullscreen).modal('refresh');}, 1000);
        });

        ecmaItem.domLowerRight.appendChild(
            Right(IconBasicButton('trash', function(ev) {EcmaItem.remove(ecmaItem);}, 'negative')));
        ecmaItem.domLowerRight.appendChild(
            Right(IconBasicButton('sticky note', function(ev) {EcmaItem.text_toggle(ecmaItem);})));
        ecmaItem.domLowerRight.appendChild(
            Right(IconBasicButton('secondary hashtag', function(ev) {EcmaItem.addtag(ecmaItem);})));
        ecmaItem.domLowerRight.appendChild(Right(ecmaItem.delayAction.dom));

        let icon = null;
        if ((overlay !== null) && ('icon' in overlay) && ((icon = overlay.icon(ecmaItem)) !== null))
        {
            this.domIcon.appendChild(this.iconBasicButton = icon);
        }
        else
        {
            this.domIcon.appendChild(this.iconBasicButton = IconBasicButton(ecmaItem.metaBean.icon));
        }


        let name = null;
        if ((overlay !== null) && ('name' in overlay) && ((name = overlay.name(ecmaItem)) !== null))
        {
            this.domName.appendChild(ecmaItem.editableName = EditableText(name));
        }
        else
        {
            this.domName.appendChild(ecmaItem.editableName = EditableText(ecmaItem.metaBean.name));
        }

        $BIND(this.iconBasicButton, 'click', function() {$(ecmaItem.editableName).focus();});

        let text = null;
        if ((overlay !== null) && ('text' in overlay) && ((text = overlay.text(ecmaItem)) !== null))
        {
            this.domText.appendChild(overlay.text(itemBean));
        }
        else
        {
            if (ecmaItem.metaBean.text !== '')
            {


            }
            text = ecmaItem.metaBean.text;
        }
        this.domText.append(this.editableText = EditableText(text));

        if (ecmaItem.itemBean.meta.text === '')
        {
            $(this.domText).hide();
        }

        console.log('yyy', overlay);

        if ((overlay !== null) && ('content' in overlay)) {
            console.log('xxx', overlay['content']);
            let content = overlay.content(ecmaItem);
            if (content !== null) {
                this.domContent.appendChild(content);
            }
        }
        else
        {
            // nothing to display
        }

        for(let fileIndex in this.itemBean.files)
        {
            let file = this.itemBean.files[fileIndex];
            console.log(this.itemBean.files[fileIndex]);
            if ((file.mimetype == 'image/png') && (ecmaItem.itemBean.meta.meta_type !== 'quicksave/screenshot')){
                let src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.itemBean.meta.user_hash + '/' + ecmaItem.itemBean.meta.meta_hash + '/' + file.file_hash + '/' + file.filename;
                this.domContent.appendChild(img({src: src, class: 'sizedimg'}));
            }
        }

        this.domName.class = this.domName.class + ' middle aligned content';

        this.domName.addEventListener('keyup', function(ev){EcmaItem.update(ecmaItem);});
        this.domText.addEventListener('keyup', function(ev){EcmaItem.update(ecmaItem);});


        this.plugin.menu(this, this.domMenu);
        for (let fileIndex in this.itemBean.files)
        {
            let file = this.itemBean.files[fileIndex];
            let src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.itemBean.meta.user_hash + '/' + ecmaItem.itemBean.meta.meta_hash + '/' + file.file_hash + '/' + file.filename;
            this.domLowerLeft.appendChild(IconBasicButton('download', function(ev){window.location=src;}));
        }

        if ((!'tags' in this.item) || (this.item.tags.length === 0))
        {
            $(this.domTags).hide();
        }
        for (let tagIndex in this.item.tags) {
            let tag = new EcmaTag(this.item.tags[tagIndex]);
            //this.domTags.style.display = 'block';
            this.domTags.appendChild(tag.dom);
        }

        hidePrettyPrint();

        showPrettyPrint();

    }

    static text_toggle(ecmaItem) {
        console.log('adding text');
        $(ecmaItem.domText).toggle(); //append($$(Segment(), EditableText(ecmaItem.metaBean.text)));
        if (ecmaItem.editableText.innerHTML === '') {
           // ecmaItem.editableText.innerHTML = 'a';
        }
        $(ecmaItem.editableText).focus();

    }

    static addtag(ecmaItem) {
        console.log('adding tag');
        let tag = new EcmaTag({
            'tag_hash': '',
            'user_hash': ecmaItem.item.meta.user_hash,
            'meta_hash': ecmaItem.item.meta.meta_hash,
            'name': 'tag#value',
            'value': ''
        });
        //this.tags.push(tag);
        ecmaItem.domTags.appendChild(tag.dom);
        $(ecmaItem.domTags).show();
    }

    static remove(ecmaItem) {

        console.log('try to remove');

        let trash;
        let cancel;

        let confirm = $$(div({class: 'ui center aligned basic modal'}),
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
            let meta_hash = ecmaItem.itemBean.meta.meta_hash;
            API.meta_delete(meta_hash, function (reply) {
                $(confirm).modal('hide');
                confirm.parentNode.removeChild(confirm);
                ecmaItem.domLayout.parentNode.removeChild(ecmaItem.domLayout);
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
        ecmaItem.metaBean.name = ecmaItem.editableName.innerHTML;
        //item.bean.item_type = ecmaItem.dom.get_item_type();
        ecmaItem.metaBean.text = ecmaItem.editableText.innerHTML;

        API.meta_update(ecmaItem.metaBean, function (reply) {
                console.log(reply)
            });
    }

    static do_revert(ecmaItem) {
        ecmaItem.editableName.innerHTML = ecmaItem.metaBean.name;
        ecmaItem.editableText.innerHTML = ecmaItem.metaBean.text;

        API.meta_update(ecmaItem.metaBean, function (reply) {
            console.log(reply)
        });
    }

    static update(ecmaItem)
    {
        ecmaItem.delayAction.restart();
    }
}