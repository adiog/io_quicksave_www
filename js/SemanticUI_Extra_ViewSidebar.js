// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function ViewSidebar()
{
    return $$$(div({class: 'ui left vertical labeled icon sidebar menu'}),
        '<a class="item"><i class="home icon"></i>Home</a><a class="item"><i class="block layout icon"></i>Topics</a><a class="item"><i class="smile icon"></i>Friends</a><a class="item"><i class="calendar icon"></i>History</a><a class="item"><i class="mail icon"></i>Messages</a><a class="item"><i class="chat icon"></i>Discussions</a><a class="item"><i class="trophy icon"></i>Achievements</a><a class="item"><i class="shop icon"></i>Store</a><a class="item"><i class="settings icon"></i>Settings</a>');
}