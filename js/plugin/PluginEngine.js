class Plugin
{
    static match(item)
    {
        return false;
    }

    static icon(item)
    {
        return IconButton('square');
    }

    static display(item)
    {
        return null;
    }

    static menu(item)
    {
        return null;
    }
}

class PluginEngine
{
    constructor()
    {
        this.plugins = [];
    }

    registerPlugin(plugin)
    {
        this.plugins.push(plugin);
    }

    matchPlugin(item)
    {
        for(let pluginIndex in this.plugins)
        {
            if (this.plugins[pluginIndex].match(item))
            {
                return this.plugins[pluginIndex];
            }
        }
        return Plugin;
    }
}

var pluginEngine = new PluginEngine();