// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function ViewSidebar() {
    document.body.appendChild($$(div({style: 'position: absolute; left: 10px; top: 30px;'}), Toggle(
        LabeledIconButton('primary button content', 'Views'),
        LabeledIconButton('content', 'Views'),
        function() {$('#menu').sidebar('toggle');}
    )));
}