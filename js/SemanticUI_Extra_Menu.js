// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function ViewSidebarToggle(sidebar) {
    return Toggle(
        LabeledIconButton('primary button content', 'Views'),
        LabeledIconButton('primary button content', 'Views'),
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
        LabeledIconButton('primary button content', 'Menu'),
        LabeledIconButton('primary button content', 'Menu'),
        function() {$(sidebar).sidebar('toggle');}
    );
}

function ConfigMenu()
{
    return div({class: 'ui fixed sticky clearing segment', style: 'right: 10px; top: 10px;'});
}