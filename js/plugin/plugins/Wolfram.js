class WolframPlugin
{
    static match(ecmaItem)
    {
        return ((typeof(ecmaItem.metaBean.freetext) != 'undefined') && (ecmaItem.metaBean.freetext.indexOf('$') != -1));
    }

    static icon(ecmaItem)
    {
        return IconButton('superscript');
    }

    static display(ecmaItem)
    {
        let dom = div();
        return dom;
    }

    static menu(item, dom)
    {
        dom.appendChild(Left(IconButton('certificate', function(ev) {
            console.log('wolf');
            WolframPlugin.download(item);
        })));
    }

    static appid()
    {
        return '7YKHRU-L74LQHJLVE'
    }

    static download(ecmaItem)
    {
        let url = 'https://www.wolframalpha.com/input/?appid=' + WolframPlugin.appid() + '&i=' + ecmaItem.metaBean.text.replace(/\$/g, '');
        console.log(url);
        document.location.href = url;
    }
}

pluginEngine.registerPlugin(WolframPlugin);
