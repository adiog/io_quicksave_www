class YouTubePlugin
{
    static match(ecmaItem)
    {
        return ((typeof(ecmaItem.metaBean.source_url) != 'undefined') && (ecmaItem.metaBean.source_url.indexOf('youtube.com') != -1));
    }

    static icon(ecmaItem)
    {
        return IconButton('youtube');
    }

    static display(ecmaItem)
    {
    /*
        let dom = document.createElement('iframe');
        dom.id = 'ytplayer';
        dom.type = 'text/html'
        dom.width = 640;
        dom.height = 360;
        dom.src = ecmaItem.item.meta.source_url;
        dom.frameborder = 0;
        return dom;*/
        let file = ecmaItem.files.find(function(file){return file.mimetype.indexOf('video') !== -1;});
        if (file) {
            return $$(video({'controls': 'controls'}), source({src: CDN.url(ecmaItem.meta, file), type: file.mime_type}))
        } else
        {
            return div();
        }
    }

    static menu(item, dom)
    {
        //dom.appendChild(Left(IconButton('download', function(ev) {YouTubePlugin.download(item)})));
    }

    static download(ecmaItem)
    {
        //let src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.itemBean.meta.user_hash + '/' + ecmaItem.itemBean.meta.meta_hash + '/' + file.file_hash + '/' + file.filename;
        //document.location.href = src;
    }
}

pluginEngine.registerPlugin(YouTubePlugin);
