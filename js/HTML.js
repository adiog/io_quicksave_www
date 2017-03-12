// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

const html2dom = {
    acceptcharset: 'acceptCharset',
    accesskey: 'accessKey',
    bgcolor: 'bgColor',
    cellindex: 'cellIndex',
    cellpadding: 'cellPadding',
    cellspacing: 'cellSpacing',
    choff: 'chOff',
    class: 'className',
    codebase: 'codeBase',
    codetype: 'codeType',
    colspan: 'colSpan',
    datetime: 'dateTime',
    checked: 'defaultChecked',
    selected: 'defaultSelected',
    value: 'defaultValue',
    frameborder: 'frameBorder',
    httpequiv: 'httpEquiv',
    longdesc: 'longDesc',
    marginheight: 'marginHeight',
    marginwidth: 'marginWidth',
    maxlength: 'maxLength',
    nohref: 'noHref',
    noresize: 'noResize',
    noshade: 'noShade',
    nowrap: 'noWrap',
    placeholder: 'placeholder',
    readonly: 'readOnly',
    rowindex: 'rowIndex',
    rowspan: 'rowSpan',
    sectionrowindex: 'sectionRowIndex',
    selectedindex: 'selectedIndex',
    tabindex: 'tabIndex',
    tbodies: 'tBodies',
    tfoot: 'tFoot',
    thead: 'tHead',
    type: 'type',
    url: 'URL',
    usemap: 'useMap',
    valign: 'vAlign',
    valuetype: 'valueType'
};

function $DOM(elementName, elementAttributes={})
{
    let dom = document.createElement(elementName);
    for(let attributeIndex in elementAttributes)
    {
        console.log(attributeIndex, html2dom[attributeIndex], elementAttributes[attributeIndex]);
        //if (attributeIndex == 'type') {
        //    dom.setAttribute('type', elementAttributes[attributeIndex]);
        //}else
        //dom[html2dom[attributeIndex]] = elementAttributes[attributeIndex];
        dom.setAttribute(attributeIndex, elementAttributes[attributeIndex]);
    }
    return dom;
}

function $$(parentNode)
{
    for(let i = 1; i < arguments.length; i++) {
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