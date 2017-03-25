// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function main_logged()
{
    document.body.appendChild(viewSidebar = ViewSidebar());
    document.body.appendChild(configSidebar = ConfigSidebar());
    document.body.appendChild(
        viewMenu = $$(ViewMenu(),
            ViewSidebarToggle(viewSidebar)
        )
    );
    document.body.appendChild(
        configMenu = $$(ConfigMenu(),
            LoginSidebarToggle(configSidebar), br(), br(),
            MathJaxToggle(), br(), br(),
            PrettyPrintToggle()
        )
    );
    qsmain();
    $(viewMenu).sticky();
    $(configMenu).sticky();
    showPrettyPrint();
    showTypeset();
}


function submitSuccessCallback(response) {
    API.put_token(response.token, function () {
        console.log('logged');
        $('.ui.modal')
            .modal('hide')
        ;
        main_logged();
    }, function () {
        console.log('not logged')
    });
}

function submitCallback(ev) {
   // ev.preventDefault();
    usernameDom = document.getElementById('username');
    passwordDom = document.getElementById('password');
    API.get_token(usernameDom.value, passwordDom.value, 3600, submitSuccessCallback);
}

function main_login_form()
{
    submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', submitCallback);

    $('.ui.modal')
        .modal('show')
    ;
}

function test()
{
    OAuth.token_get('adiog', 'pass', 100,
        function(responsePositive){
            console.log(responsePositive);
            token = responsePositive.token;
            OAuth.token_check(token,
                function(responsePositive) {
                    console.log(responsePositive);
                    OAuth.token_delete(token,
                        function () {
                            console.log('token deleted');
                        }
                    );
                },
            );
        }
    );
}