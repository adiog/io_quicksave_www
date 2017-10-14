class SourceCppPlugin
{
    static match(ecmaItem)
    {
        return ecmaItem.hasTag('cpp');
    }

    static icon(ecmaItem)
    {
        return IconButton('code');
    }

    static display(ecmaItem)
    {
        return $$$(pre({class: 'prettyprint linenums lang-cpp', style: 'text-align: left'}), ecmaItem.metaBean.text);
    }

    static menu(item, dom)
    {
    }
}

pluginEngine.registerPlugin(SourceCppPlugin);
