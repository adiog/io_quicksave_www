// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

let default_config = {
    'api.quicksave.io': 'https://api.quicksave.io'
};

function localStorageSetItem(key, value)
{
    chrome.storage.sync.get(
        default_config,
        function(storage) {
            storage[key] = value;
            chrome.storage.sync.set(storage);
        }
    );
}

function localStorageWithItem(key, bindCallback)
{
    chrome.storage.sync.get(
        default_config,
        function(storage) {
            bindCallback(storage[key])();
        }
    );
}

