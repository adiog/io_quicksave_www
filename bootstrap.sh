#!/bin/bash
# This file is a part of quicksave project.
# Copyright 2017 Aleksander Gajewski <adiog@quicksave.io>.

cd $(dirname $0)

([[ ! -e deps/jquery/dist/jquery.min.js ]] && cd deps/jquery/ && npm run build)
([[ ! -e deps/semantic-ui/dist/semantic.min.js ]] && cd deps/semantic-ui/ && npm run install)
ln -sf deps/MathJax mathjax

function client-chrome-link()
{
    mkdir -p client-chrome/shared
    ln -fs `pwd`/$1 client-chrome/shared/$(basename $1)
}

function client-chrome()
{
    client-chrome-link deps/jquery/dist/jquery.min.js
    client-chrome-link deps/semantic-ui/dist/semantic.min.js
    client-chrome-link deps/semantic-ui/dist/semantic.min.css
    client-chrome-link js/HTML.js
    client-chrome-link js/SemanticUI_Base.js
    client-chrome-link js/SemanticUI_Extra_LoginForm.js
    client-chrome-link js/API.js
    client-chrome-link js/Request.js
    client-chrome-link js/ConsoleLog.js
}

client-chrome

