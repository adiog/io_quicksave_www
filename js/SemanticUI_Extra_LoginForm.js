// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function LoginForm() {
    loggedDom = LabeledIconButton('negative sign out', 'Logout');
var userDom;
function statusSuccessCallback(response)
{
    passwordDom.value = '';
    if (response.message != 'not authenticated') {
        usernameDom.value = response.message;
        userDom = LabeledIconButton('user', response.message);
        if (notLoggedDom.parentNode)
        notLoggedDom.parentNode.replaceChild(loggedDom, notLoggedDom);
        passwordDom.placeholder = 'logged succesfully';
        loginPassword.parentNode.replaceChild(userDom, loginPassword);
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
    userDom.parentNode.replaceChild(loginPassword, userDom);
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
                $$$(label(), 'API url'),
                apiDom = input({type: 'text'})
            ),
            loginPassword = $$(div(),
            $$(div({class: 'field'}),
                $$$(label(), 'Username'),
                usernameDom = input({placeholder: 'username', name: 'username', type: 'text'})
            ),
            $$(div({class: 'field'}),
                $$$(label(), 'Password'),
                passwordDom = input({placeholder: 'password', name: 'password', type: 'password'})
            ))),
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