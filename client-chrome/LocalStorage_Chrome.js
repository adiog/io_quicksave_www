// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

let default_config = {
    'api.quicksave.io': 'https://api.quicksave.io',
    'oauth.quicksave.io': 'https://oauth.quicksave.io',
    'token': ''
};

function localStorageSetItem(key, value)
{
    chrome.extension.getBackgroundPage().console.log(key);
    chrome.extension.getBackgroundPage().console.log(value);
    chrome.storage.sync.get(
        default_config,
        function(storage) {
            chrome.extension.getBackgroundPage().console.log(storage);
            storage[key] = value;
            chrome.extension.getBackgroundPage().console.log(storage);

            chrome.storage.sync.set(storage);
        }
    );
}

function localStorageWithItem(key, bindCallback)
{
    chrome.extension.getBackgroundPage().console.log(key);
    chrome.storage.sync.get(
        default_config,
        function(storage) {
            chrome.extension.getBackgroundPage().console.log(storage);
            bindCallback(storage[key])();
        }
    );
}

