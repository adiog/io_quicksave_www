// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

var background;
var configMenu;
var logged = false;

function main_logged()
{
    logged = true;
    background.style = 'position: fixed; left: 0px; top: 0px; z-index: -1; opacity: 0.4;';
    loginMenu.parentNode.removeChild(loginMenu);
    let configSidebar;
    //document.body.appendChild(viewSidebar = ViewSidebar());
    document.body.appendChild(configSidebar = ConfigSidebar());
    //document.body.appendChild(
    //    viewMenu = $$(ViewMenu(),
    //        ViewSidebarToggle(viewSidebar)
    //    )
    //);
    document.body.appendChild(
        configMenu = $$(ConfigMenu(),
            MathJaxToggle(), br(), br(),
            PrettyPrintToggle()
        )
    );

    document.body.appendChild(
        configMenu = $$(LogoutMenu(),
            LoginSidebarToggle(configSidebar), br(), br(),
            logoutButton = LabeledIconButton('basic negative sign out', 'Logout')
        )
    );

    logoutButton.addEventListener('click', function(ev){
       API.session_delete(function (ev) {
           location.reload(true);
           return false;
       })
    });

    qsmain();
    //$(viewMenu).sticky();
    $(configMenu).sticky({context: body});

    $(omni).sticky();

    showPrettyPrint();
    showTypeset();


}


function submitSuccessCallback(response) {
    API.token_put(response.token, function () {
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
    OAuth.token_get(usernameDom.value, passwordDom.value, 3600, submitSuccessCallback, function(){passwordDom.value = ''; passwordDom.placeholder = 'incorrect credentials';});
}

function wip(id)
{
    let dom = document.getElementById(id);
    dom.addEventListener('click', function(ev){
        dom.parentNode.replaceChild(LabeledIconButton('warning sign negative basic', 'Work in progress'), dom);
    });
}

function main_login_form()
{
    submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', submitCallback);

    wip('signup');
    wip('facebook');
    wip('google');
    wip('gdrive');
    wip('dropbox');
    /*
    $('.ui.modal')
        .modal({
            onApprove : function() {
        //        ... //Validate here, or pass validation to somewhere else
                return false; //Return false as to not close modal dialog
            }
        })
        .modal('show')
    ;
*/
}

function redrawBackground()
{
    let pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
    });
    background = pattern.canvas();
    if (logged)
        background.style = 'position: fixed; left: 0px; top: 0px; z-index: -1; opacity: 0.4;';
    else
        background.style = 'position: absolute; left: 0px; top: 0px; z-index: -1;';
    document.body.appendChild(background);

}
var omni;

function do_onResize(){
    //$('.sticky').each(function(){console.log("x"); $(this).sticky('unbind'); $(this).sticky();});

    if(typeof background !== 'undefined') {
        background.parentNode.removeChild(background);
    }
    redrawBackground();
}
function main()
{
    onResize = new DelayAction('', '', do_onResize,'','',null,300,100,null);
    window.onresize = function(event) {
        onResize.restart();
    };

    redrawBackground();

    let loginButton;
    document.body.appendChild(
        loginMenu = $$(LoginMenu(),
            loginButton = LabeledIconButton('basic primary sign in', 'Login')
        )
    );
    loginButton.addEventListener('click', function(ev){
        $('.ui.modal')
            .modal('show')
    });
    API.session_check(main_logged, main_login_form);
}