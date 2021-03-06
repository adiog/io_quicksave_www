// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function ViewSidebarToggle(sidebar) {
    return Toggle(
        LabeledIconButton('primary basic button content', 'Views'),
        LabeledIconButton('primary basic button content', 'Views'),
        function() {$(sidebar).sidebar('toggle');}
    );
}

function ViewMenu()
{
    return div({class: 'ui fixed sticky clearing segment', style: 'left: 10px; top: 10px;'});
}

function LoginSidebarToggle(sidebar)
{
    return Toggle(
        LabeledIconButton('secondary basic button setting', 'Config'),
        LabeledIconButton('secondary basic button setting', 'Config'),
        function() {$(sidebar).sidebar('toggle');}
    );
}

function ConfigMenu()
{
    return div({class: 'ui fixed sticky clearing segment', style: 'right: 10px; top: 10px;'});
}

function LogoutMenu()
{
    return div({class: 'ui fixed sticky clearing segment', style: 'right: 10px; bottom: 10px;'});
}


function LoginMenu()
{
    return div({class: 'ui fixed sticky clearing segment', style: 'right: 10px; bottom: 10px;'});
}