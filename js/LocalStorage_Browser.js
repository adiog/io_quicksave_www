// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

let default_config = {
    'api.quicksave.io': 'https://api.quicksave.io',
    'oauth.quicksave.io': 'https://oauth.quicksave.io',
    'token': ''
};

function localStorageSetItem(key, value)
{
    localStorage.setItem(key, value);
}

function localStorageWithItem(key, bindCallback)
{
    value = localStorage.getItem(key);
    if (!value)
    {
        value = default_config[key];
    }
    bindCallback(value)();
}

