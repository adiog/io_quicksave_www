// This file is a part of quicksave project.
// Copyright (c) 2016 Aleksander Gajewski <adiog@brainfuck.pl>,
//                    Adam Morawski <poczta@adammorawski.pl>.

var is_debug_enabled = true;

function xinspect(o, i)
{
    if (typeof i == 'undefined')
    {
        i = '';
    }
    if (i.length > 50)
        return '[MAX ITERATIONS]';
    var r = [];
    for (var p in o) {
        var t = typeof o[p];
        r.push(i + '"' + p + '" (' + t + ') => ' + (t == 'object' ? 'object:' + xinspect(o[p], i + '  ') : o[p] + ''));
    }
    return r.join(i + '\n');
}

function inspect(element)
{
    if (is_debug_enabled)
    {
        inspected_element = xinspect(element);
        console.log(inspected_element);
    }
}

function debug(element)
{
    if (is_debug_enabled)
    {
        console.log(element);
    }
}

if (console === undefined)
{
    console = {};
}

console.debug = debug;
console.inspect = inspect;
