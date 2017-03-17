// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function Button(label=null, callback=null, style='')
{
    let dom = document.createElement('button');
    dom.className = 'ui ' + style + ' button';
    if (label != null)
    {
        dom.innerHTML = label;
    }
    if (callback != null)
    {
        dom.addEventListener('click', callback);
    }
    return dom;
}

function Icon(icon)
{
    let dom = document.createElement('i');
    dom.className = icon + ' icon';
    return dom;
}

function Text(text)
{
    return document.createTextNode(text);
}

function Segment(attrs={})
{
    attrs['class'] = 'ui center aligned segment middle aligned content';
    return div(attrs);
}

function CompactSegment(attrs={})
{
    attrs['class'] = 'ui compact segment';
    return div(attrs);
}

function FloatedSegment(attrs={})
{
    attrs['class'] = 'ui left floated compact segment';
    return div(attrs);
}

function EditableText(text='', callback=null)
{
    dom = $$$(div({contentEditable: true}), text);
    if (callback != null)
    {
        dom.addEventListener('blur', callback);
        dom.addEventListener('keyup', callback);
        dom.addEventListener('paste', callback);
        dom.addEventListener('input', callback);
    }
    return dom;
}

function LabeledIconButton(icon, label, callback=null, style='')
{
    let dom = document.createElement('button');

    targetType = '';
    uiTypes = ['primary', 'secondary', 'positive', 'negative'];
    for(uiTypeIndex in uiTypes)
    {
        uiType = uiTypes[uiTypeIndex];
        if (icon.indexOf(uiType) != -1) {
            targetType = uiType;
            icon = icon.replace(uiType, '');
        }
    }
    dom.className = 'ui ' + targetType + ' labeled icon ' + style + ' button';
    dom.appendChild(Icon(icon));
    dom.appendChild(Text(label));
    if (callback != null)
    {
        dom.addEventListener('click', callback);
    }
    return dom;
}

function IconButton(icon, callback=null, style='')
{
    let dom = document.createElement('button');
    targetType = '';
    uiTypes = ['primary', 'secondary', 'positive', 'negative'];
    for(uiTypeIndex in uiTypes)
    {
        uiType = uiTypes[uiTypeIndex];
        if (icon.indexOf(uiType) != -1) {
            targetType = uiType;
            icon = icon.replace(uiType, '');
        }
    }
    dom.className = 'ui ' + targetType + ' icon ' + style + ' button';
    dom.appendChild(Icon(icon));
    if (callback != null)
    {
        dom.addEventListener('click', callback);
    }
    return dom;
}

function IconBasicButton(icon, callback=null, style='')
{
    let dom = document.createElement('button');
    targetType = '';
    uiTypes = ['primary', 'secondary', 'positive', 'negative'];
    for(uiTypeIndex in uiTypes)
    {
        uiType = uiTypes[uiTypeIndex];
        if (icon.indexOf(uiType) != -1) {
            targetType = uiType;
            icon = icon.replace(uiType, '');
        }
    }
    targetType = '';
    dom.className = 'ui ' + targetType + ' icon ' + style + ' basic button';
    dom.appendChild(Icon(icon));
    if (callback != null)
    {
        dom.addEventListener('click', callback);
    }
    return dom;
}

function InlineLoader()
{
    let dom = div({class: 'ui mini active inline loader'});
    return dom;
}

function LabeledIconVariantButton(icon, label, callback, style)
{
    if ((icon == null) && (label == null))
    {
        return null;
    }
    else if (icon == null)
    {
        return Button(label, callback, style);
    }
    else if (label == null)
    {
        return IconButton(icon, callback, style);
    }
    else
    {
        return LabeledIconButton(icon, label, callback, style);
    }
}

function Toggle(startNode, otherNode, toggleNodeCallback)
{
    $BIND(startNode, 'click', function () {
        startNode.parentNode.replaceChild(otherNode, startNode);
        toggleNodeCallback();
    });

    $BIND(otherNode, 'click', function () {
        otherNode.parentNode.replaceChild(startNode, otherNode);
        toggleNodeCallback();
    });

    return startNode;
}

function Switch(startNode, startNodeCallback, otherNode, otherNodeCallback)
{
    $BIND(startNode, 'click', function () {
        startNode.parentNode.replaceChild(otherNode, startNode);
        otherNodeCallback();
    });

    $BIND(otherNode, 'click', function () {
        otherNode.parentNode.replaceChild(startNode, otherNode);
        startNodeCallback();
    });

    return startNode;
}

function SearchBox(placeholder, searchCallback) {
    let omni;
    let dom =
        $$(div({class: 'ui search center aligned', style: 'text-align: center;'}),
            $$(div({class: 'ui icon input', style: 'margin: auto;'}),
                omni = input({class: 'prompt', placeholder: 'Type QSQL query...', type: 'text', size: 100}),
                i({class: 'search icon'})
            )
        );
    $BIND(omni, 'keyup', function (ev)  {
        searchCallback(omni)();
    });
    return dom;
}