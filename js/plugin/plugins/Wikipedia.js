class WikipediaPlugin
{
    static match(ecmaItem)
    {
        return ecmaItem.hasTag('wiki');
    }

    static icon(ecmaItem)
    {
        return IconBasicButton('wikipedia primary');
    }

    static display(ecmaItem)
    {
        let dom = document.createElement('div');
        let img = document.createElement('img');
        img.src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.metaBean.url + '/thumbnail_crop.png';
        dom.appendChild(img);
        return dom;
    }

    static menu(item, dom)
    {
    }
}

pluginEngine.registerPlugin(WikipediaPlugin);
