// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function DomOnDemand(icon, label, delayedDom)
{
    let onDemand = LabeledIconVariantButton(icon + ' basic', label);
    $BIND(onDemand, 'click', function(ev)
    {
        onDemand.parentNode.replaceChild(delayedDom, onDemand);
    });
    return onDemand;
}

