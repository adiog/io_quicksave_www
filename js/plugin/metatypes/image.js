/**
 * Created by adiog on 28.03.17.
 */

const ImageMetaType =
    {
        content: function (ecmaItem)
        {
            let contentDom = null;
            let itemBean = ecmaItem.itemBean;
            itemBean.files.some(
                function (file)
                {
                    if (file.mimetype.indexOf('image/') !== -1) {
                        contentDom = img({src: CDN.url(itemBean.meta, file)});
                    }
                }
            );
            return contentDom;
        }
    };