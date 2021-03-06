// This file is a part of quicksave project.
// Copyright (c) 2016 Aleksander Gajewski <adiog@brainfuck.pl>.

var data = [];
var output = [];

var resultsContainer;
var refineSearchOmnibox;

var config = {
    defaultConfig : {
        'query' : '',
        'omni': '',
        'filters': {}
    },
    page : 1,
    pages : 1,
    pageSize : 10,
    filters: {}
};

function restoreConfig()
{   
    if (typeof(Storage) !== "undefined") 
    {
        if (localStorage.config) 
        {
            config = JSON.parse(localStorage.config);
        } 
        else
        {
            config.filters.omni = '';
        }
    }
}

function storeConfig() 
{
    if (typeof(Storage) !== "undefined") 
    {
        localStorage.config = JSON.stringify(config);
    }
}

function resetConfig() 
{
    if (typeof(Storage) !== "undefined") 
    {
        localStorage.clear();
    }
}

function changePage(c) 
{
    newPage = config.page + c;
    if (newPage >= 1 && newPage <= config.pages) 
    {
        config.page = newPage;
        displayOutput();
    }
}

function process_response(json_response)
{
        data = [];
        for (var j = 0; j < json_response.items.length; j++)
        {
            var item = json_response.items[j];
            data.push(item);
        }
        updateOutput();
}

function initializeData()
{
    API.retrieve(process_response, "WHERE text ~ ''");
}

function buildButtonPrevious()
{
    return IconButton('arrow circle outline up', function () {
        changePage(1);
    });
}

function buildButtonNext()
{
    return IconButton('arrow circle outline down', function () {
        changePage(1);
    });
}

function buildPaginationInfo() {
    var paginationInfo = document.createElement('button');

    paginationInfo.id = 'pagination';


    return paginationInfo;
}

function buildButtons()
{
    var buttons = document.createElement('div');

    buttons.appendChild(buildButtonPrevious());
    buttons.appendChild(buildPaginationInfo());
    buttons.appendChild(buildButtonNext());

    return buttons;
}

function omniboxCallback(dom)
{
    console.log(dom.value);
    return function(){
    if (dom.value.length > 2) {

        config.filters.omni = dom.value;
        var qsql_query = dom.value;
        if (window.is_qsql_query_valid(qsql_query))
        {
            dom.style.border = '1px solid green';
            API.retrieve(process_response, config.filters.omni);
        }
        else
        {
            dom.style.border = '3px solid red';
        }

    }
    else if (dom.value.length == 0)
    {
        dom.style.border = '1px solid green';
        API.retrieve(process_response, "WHERE text match ''");
    }
     else if (typeof config.filters.omni != "undefined") {
        delete config.filters.omni;
        updateOutput();
    }
    }
}

function buildRefineSearchOmnibox()
{
    let initValue = null;
    if (typeof config.filters.omni != "undefined") {
        initValue = config.filters.omni;
    }
    refineSearchOmnibox = $$(Segment({class: 'center aligned segment fixed sticky', style: 'text-align: center; overflow: auto; top: 0; margin: 20px 25% ! important; width: 50%  ! important'}), SearchBox('Search...', omniboxCallback));

    return refineSearchOmnibox;
}

function buildAdditionalNavigationButtons()
{
    var additional_navigation_buttons = document.createElement('div');

    additional_navigation_buttons.appendChild(buildButtonPrevious());
    additional_navigation_buttons.appendChild(buildButtonNext());

    return additional_navigation_buttons;
}

function buildResultsContainer()
{
    return div({style: 'padding-top: 100px;'});
}

function buildLineBreak()
{
    return document.createElement('br');
}

function buildRefineSearch()
{
    var refineSearch = document.createElement('div');

    refineSearch.appendChild(buildRefineSearchCriteria());

    return refineSearch;
}

function initializeDocument()
{
    resultsContainer = buildResultsContainer();
    //document.body.appendChild(buildButtons());
    document.body.appendChild(omni = buildRefineSearchOmnibox());
    document.body.appendChild(resultsContainer);
    //document.body.appendChild(buildAdditionalNavigationButtons());

    //document.addEventListener("contextmenu", function(e) { e.preventDefault(); }, false);
}

function qsmain()
{
    resetConfig();
//    restoreConfig();
    initializeDocument();
    initializeData();
    updateOutput();
}

function get_tag_dom(callback, content)
{

}

function print_tag(tag)
{
    return '<span contenteditable="true" onchange="tag_update(' + tag['tag_hash'] + ')">' + tag['name'] + '</span>' + ((tag['value'] != '') ? (' [' + tag['value'] + ']' ) : '')
}

function shadow(response_json)
{
}

function displayOutput()
{
    var items = output;

    var first = config.pageSize * (config.page - 1);
    var last = Math.min(config.pageSize * config.page, items.length);
    config.pages = Math.ceil(items.length / config.pageSize);

    var itemsToRender = [];
    for (var i in items)
    {
        itemsToRender.push(items[i]);
    }

    var itemFixedFields = ['meta_hash', 'title', 'freetext', 'source_title', 'source_url', 'timestamp'];

    function getHTMLTableColumns() {
    try {
        var selectString = document.getElementById('select').value;
        selectString = selectString.replace(/select/g, '');
        selectString = selectString.replace(/\*/, itemFixedFields.join(','));
        selectString = selectString.replace(/\ */, '');
        return selectString.split(',');
    } catch(e) {
        return itemFixedFields;
    }
    };


    var renderer = new thumbs_renderer();

    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(render_items(itemsToRender, renderer));

    showPrettyPrint();
}

function updateOutput() {
    config.page = 1;
    config.pages = 1;
    output = [];

    for (var i in data) {
        output.push(data[i]);
    }

    displayOutput(output);
};
