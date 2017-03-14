// This file is a part of quicksave project.
// Copyright (c) 2016 Adam Morawski <poczta@adammorawski.pl>,
//                    Aleksander Gajewski <adiog@brainfuck.pl>.


var fill_front_with_pattern =
function(input_string, length_of_output_string, pattern)
{
    var filling_string = new Array(1 + length_of_output_string).join(pattern);
    return (filling_string + input_string).slice(-length_of_output_string);
}

var zerofill =
function(input_string, length_of_output_string)
{
    return fill_front_with_pattern(input_string, length_of_output_string, '0');
}

function UUID() {
    var d = new Date().getTime();
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function appendChild(parent, child)
{
    if (child != null)
    {
        parent.appendChild(child);
    }
}