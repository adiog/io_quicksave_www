#!/bin/bash
# This file is a part of quicksave project.
# Copyright 2017 Aleksander Gajewski <adiog@quicksave.io>.

cd $(dirname $0)

([[ ! -e deps/jquery/dist/jquery.min.js ]] && cd deps/jquery/ && npm run build)
([[ ! -e deps/semantic-ui/dist/semantic-ui.min.js ]] && cd deps/semantic-ui/ && npm run install)
ln -sf deps/Mathjax mathjax
