/**
 * Created by adiog on 28.03.17.
 */

const VideoMetaType = {
    content: function(ecmaItem){
        let file = ecmaItem.itemBean.files.find(function(file){return file.mimetype.indexOf('video') !== -1;});
        if (file) {
            let vid = $$(video({'controls': 'controls', 'width': '70%', style: 'margin: 0% 15%;'}), source({src: CDN.url(ecmaItem.itemBean.meta, file), type: file.mimetype}));
            let buttonx1 = LabeledIconButton('play', 'x1');
            let buttonx2 = LabeledIconButton('play', 'x2');
            let buttonx3 = LabeledIconButton('play', 'x3');
            let dom = $$(div(),
                vid, buttonx1, buttonx2, buttonx3
            );
            buttonx1.addEventListener('click', function(){vid.playbackRate = 1.0; vid.play();});
            buttonx2.addEventListener('click', function(){vid.playbackRate = 2.0; vid.play();});
            buttonx3.addEventListener('click', function(){vid.playbackRate = 3.0; vid.play();});
            return dom;
        } else
        {
            return div();
        }
    },

    icon: function(ecmaItem)
    {
        return IconBasicButton('youtube');
    }
};