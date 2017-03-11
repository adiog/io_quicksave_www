// This file is an AUTOGENERATED part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.
// This file is an AUTOGENERATED part of beans project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

class TagBean extends Bean
{
}
register_bean_spec("TagBean", TagBean, '{  "tag_id": "Optional(Int)",  "user_id": "Optional(Int)",  "item_id": "Optional(Int)",  "name": "Optional(String)",  "value": "Optional(String)"}');

// This file is an AUTOGENERATED part of beans project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

class ItemBean extends Bean
{
}
register_bean_spec("ItemBean", ItemBean, '{  "item_id": "Optional(Int)",  "user_id": "Optional(Int)",  "item_type": "Optional(String)",  "title": "Optional(String)",  "url": "Optional(String)",  "freetext": "Optional(String)",  "author": "Optional(String)",  "source_title": "Optional(String)",  "source_url": "Optional(String)",  "timestamp": "Optional(String)"}');

// This file is an AUTOGENERATED part of beans project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

class RichItemBean extends Bean
{
}
register_bean_spec("RichItemBean", RichItemBean, '{  "item": "Item",  "tags": "List(Tag)"}');

