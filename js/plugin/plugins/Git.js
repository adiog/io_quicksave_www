class GitPlugin
{
    static match(ecmaItem)
    {
        return ((typeof(ecmaItem.metaBean.source_url) !== 'undefined') && (ecmaItem.metaBean.source_url.indexOf('github.com') != -1));
    }

    static icon(ecmaItem)
    {
        return IconButton('github');
    }

    static display(ecmaItem)
    {
        return $$$(div(), 'git -c http.sslVerify=false clone https://cdn.quicksave.io/' + String(ecmaItem.metaBean.item_id) + '/git/.git repo');
    }

    static menu(item, dom)
    {
        dom.appendChild(Left(IconButton('download', function(ev) {GitPlugin.download(ecmaItem)})));
    }

    static download(ecmaItem)
    {
        document.location.href = 'https://cdn.quicksave.io/' + ecmaItem.metaBean.item_hash + '/git.tar';
    }
}

pluginEngine.registerPlugin(GitPlugin);
