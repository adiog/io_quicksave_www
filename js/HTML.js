// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function $DOM(elementName, elementAttributes={})
{
    let dom = document.createElement(elementName);
    for(let attributeIndex in elementAttributes)
    {
        dom.setAttribute(attributeIndex, elementAttributes[attributeIndex]);
    }
    return dom;
}

function $$(parentNode)
{
    for(let i = 1; i < arguments.length; i++)
    {
        parentNode.appendChild(arguments[i]);
    }
    return parentNode;
}

function $$$(parentNode, innerHTML)
{
    parentNode.innerHTML = innerHTML;
    return parentNode;
}

function $BIND(dom, eventName, callback)
{
    dom.addEventListener(eventName, callback);
    return dom;
}


function div(attrs)
{
    return $DOM('div', attrs);
}

function input(attrs)
{
    return $DOM('input', attrs);
}

function i(attrs)
{
    return $DOM('i', attrs);
}

function button(attrs)
{
    return $DOM('button', attrs);
}

function form(attrs)
{
    return $DOM('form', attrs);
}

function label(attrs)
{
    return $DOM('label', attrs);
}

function pre(attrs)
{
    return $DOM('pre', attrs);
}

function br(attrs)
{
    return $DOM('br', attrs);
}