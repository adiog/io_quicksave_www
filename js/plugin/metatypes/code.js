/**
 * Created by adiog on 28.03.17.
 */

const CodeMetaType =
    {
        content:
            function (ecmaItem) {
                let contentDom = null;
                contentDom = $$$(pre({class: 'prettyprint linenums', style: 'text-align: left'}), ecmaItem.metaBean.text);
                return contentDom;
            }
    };