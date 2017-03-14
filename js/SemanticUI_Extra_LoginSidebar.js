// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function LoginSidebar()
{
    document.body.appendChild(sidebar = $$(div({class: 'ui right vertical sidebar menu'}), LoginForm()));
    document.body.appendChild($$(div({style: 'position: absolute; left: 10px; top: 10px;'}), Toggle(
        LabeledIconButton('primary button content', 'Menu'),
        LabeledIconButton('content', 'Menu'),
        function() {$(sidebar).sidebar('toggle');}
    )));
}