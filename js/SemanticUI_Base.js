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

function EditableText(text='', callback=null)
{
    dom = document.createElement('div');
    dom.contentEditable = true;
    dom.className = 'dotted';
    dom.innerHTML = text;
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
    dom.className = 'ui labeled icon ' + style + ' button';
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
    dom.className = 'ui icon ' + style + ' button';
    dom.appendChild(Icon(icon));
    if (callback != null)
    {
        dom.addEventListener('click', callback);
    }
    return dom;
}

function InlineLoader()
{
    let dom = Button('loader');
    //dom.appendChild(div('ui mini active inline loader'));
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

function div(className)
{
    let dom = document.createElement('div');
    dom.className = className;
    return dom;
}

function input(className, type, placeHolder)
{
    let dom = document.createElement('input');
    dom.className = className;
    dom.type = type;
    dom.placeHolder = placeHolder;
    return dom;
}

function $$(parentNode)
{
    for(let i = 1; i < arguments.length; i++) {
        parentNode.appendChild(arguments[i]);
    }
    return parentNode;
}

function callback(dom, eventName, unbinded_callback)
{
    dom.addEventListener(eventName, function(ev) {return unbinded_callback(dom)(ev);});
    return dom;
}

function SearchBox(placeholder, searchCallback) {
    return $$(
        //div('ui loading search'), $$(
        div('ui search'), $$(
            div('ui icon input'),
                callback(input('prompt', 'Search...', 'text'), 'keyup', searchCallback),
                Icon('search')
            )
        );
}