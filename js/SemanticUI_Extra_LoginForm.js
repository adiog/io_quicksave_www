// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function LoginForm() {
    loggedDom = LabeledIconButton('negative sign out', 'Logout');

function statusSuccessCallback(response)
{
    passwordDom.value = '';
    if (response.message != 'not authenticated') {
        usernameDom.value = response.message;
        if (notLoggedDom.parentNode)
        notLoggedDom.parentNode.replaceChild(loggedDom, notLoggedDom);
        passwordDom.placeholder = 'logged succesfully';
    }
    else
    {
    }
}

function logoutSuccessCallback()
{
    if (loggedDom.parentNode)
    loggedDom.parentNode.replaceChild(notLoggedDom, loggedDom);
    passwordDom.placeholder = 'password..';
}

function statusCheck()
{
    API.status(statusSuccessCallback);
}

function submitSuccessCallback(response)
{
    if (response.message != 'not authenticated') {
        statusSuccessCallback(response);
    }
    else
    {
        passwordDom.value = '';
        passwordDom.placeholder = 'wrong credentials';
    }
}

function submitCallback(apiDom, usernameDom, passwordDom)
{
    localStorageSetItem('api.quicksave.io', apiDom.value);
    API.login(usernameDom.value, passwordDom.value, submitSuccessCallback);
}

function logoutCallback()
{
    API.logout(function(){logoutSuccessCallback();});
}


    let formDom =
        $$(div({style: 'padding: 10px;'}), $$(form({class: 'ui form segment'}),
            $$(div({class: 'field'}),
                $$$(label(), 'api.quicksave.io:'),
                apiDom = input({type: 'text'})
            ),
            $$(div({class: 'field'}),
                $$$(label(), 'Username'),
                usernameDom = input({placeholder: 'username', name: 'username', type: 'text'})
            ),
            $$(div({class: 'field'}),
                $$$(label(), 'Password'),
                passwordDom = input({placeholder: 'password', name: 'password', type: 'password'})
            )),
            $$(div({style: 'text-align: center;'}),
                notLoggedDom = LabeledIconButton('sign in primary', 'Login'),
                notificationArea = div()
            )
        );


    localStorageWithItem(
        'api.quicksave.io',
        function (api_quicksave_io) {
            return function () {
                apiDom.value = api_quicksave_io;
            };
        }
    );

    statusCheck();

    $BIND(notLoggedDom, 'click', function (ev) {
        submitCallback(apiDom, usernameDom, passwordDom)
    });
    $BIND(loggedDom, 'click', function (ev) {
        logoutCallback();
    });

    return formDom;
}