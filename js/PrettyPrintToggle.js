// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function hidePrettyPrint()
{
    $('pre').each(
        function()
        {
            this.className = this.className.replace(/\ *prettyprinted/, '');
            children = $(this.parentNode).children('.PrettyPrint_Preview');
            console.log(children);
            if(children.length == 1) {
                child = children[0];
                this.innerHTML = child.innerHTML;
                child.parentNode.removeChild(child);
            }
        }
    );
}

function showPrettyPrint()
{
    $('pre').each(
        function()
        {
            this.parentNode.appendChild($$$(div({class: 'PrettyPrint_Preview', style: 'display: none;'}), this.innerHTML));
        }
    );
    PR.prettyPrint();
}

function PrettyPrintToggle()
{
    return Switch(
        LabeledIconButton('primary button file excel outline', 'Code'),
        showPrettyPrint,
        LabeledIconButton('file outline', 'Code'),
        hidePrettyPrint
    );
}
