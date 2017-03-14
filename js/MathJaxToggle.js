// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.
/*
MathJax.Hub.Config({
    tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
*/
function hideTypeset()
{
    var HTML = MathJax.HTML;
    var jax = MathJax.Hub.getAllJax();

    for (var i = 0, m = jax.length; i < m; i++)
    {
        var script = jax[i].SourceElement();
        var tex = jax[i].originalText;

        if (script.type.match(/display/))
        {
            tex = "$$"+tex+"$$"
        }
        else
        {
            tex = "$"+tex+"$"
        }

        jax[i].Remove();

        var preview = script.previousSibling;
        if (preview && preview.className === "MathJax_Preview")
        {
            preview.parentNode.removeChild(preview);
        }
        preview = HTML.Element("span",{className:"MathJax_Preview"},[tex]);
        script.parentNode.insertBefore(preview,script);

        mathJaxNode = script.parentNode;

        script.parentNode.removeChild(script);

        mathJaxNode.innerHTML = mathJaxNode.innerHTML.replace('<span class="MathJax_Preview">', '').replace('</span>', '');
    }
}

function showTypeset(show)
{
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    //MathJax.Hub.Queue(["Reprocess",MathJax.Hub]);
}


function toggleTypeset(show)
{
    if (show)
    {
        showTypeset();
    }
    else
    {
        hideTypeset();
    }
}

function MathJaxToggle()
{
    toggleWrapper = $$(div({style: 'position: absolute; right: 10px; top: 10px;'}), Switch(
        LabeledIconButton('primary button file excel outline', 'TeX'),
        showTypeset,
        LabeledIconButton('file outline', 'TeX'),
        hideTypeset
    ));

    document.body.appendChild(toggleWrapper);
}
