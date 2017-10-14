class MP4Plugin
{
    static match(ecmaItem)
    {
        return ecmaItem.hasTag('mp4');
    }

    static icon(ecmaItem)
    {
        return IconButton('file video outline');
    }

    static display(ecmaItem)
    {
        // https://www.w3schools.com/jsref/dom_obj_video.asp

        let dom = document.createElement('video');
        dom.preload = 'auto';
        //dom.poster = 'thumb.jpg';
        dom.loop = true;
        dom.muted = true;

        let source = document.createElement('source');
        source.src = item.source_url;
        source.type = 'video/mp4';

        dom.appendChild(source);
        return dom;
    }

    static menu(item, dom)
    {
    }
}

pluginEngine.registerPlugin(MP4Plugin);
