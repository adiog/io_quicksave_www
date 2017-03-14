// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function main()
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