// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.


function LoginForm()
{
    let submit;
    let reset;

    let dom =
    $$(form({class: 'ui form segment'}),
        $$(div({class: 'field'}),
            $$$(label(), 'Username'),
            input({placeholder: 'Username', name: 'username', type: 'text'})
        ),
        $$(div({class: 'field'}),
            $$$(label(), 'Password'),
            input({name: 'password', type: 'password'})
        ),
        submit = $$$(div({class: 'ui primary submit button'}), 'Submit'),
        reset = $$$(div({class: 'ui reset button'}), 'Reset'),
        $$$(div({class: 'ui clear button'}), 'Clear')
    );

    $BIND(submit, 'click', function(ev){console.log('submit');});
    $BIND(reset, 'click', function(ev){console.log('reset');});

    document.body.appendChild(dom);
}