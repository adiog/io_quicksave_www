/**
 * Created by adiog on 28.03.17.
 */


const BookMetaType =
{
    icon:
    function (ecmaItem) {
        if (ecmaItem.itemBean.meta.icon === 'external square')
        {
            return IconBasicButton('book')
        }
        else
        {
            return null;
        }
    },

    content:
    function (ecmaItem) {
        let contentDom = null;
        ecmaItem.itemBean.files.some(
            function (file)
            {
                if (file.mimetype === 'application/pdf') {
                    let src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.itemBean.meta.user_hash + '/' + ecmaItem.itemBean.meta.meta_hash + '/' + file.file_hash + '/' + file.filename;
                    contentDom = embed({src: src, type: 'application/pdf', class: 'book'});
                    if (file.filesize > 100000) {
                        contentDom = DomOnDemand('file pdf outline', 'Display file (' + String(file.filesize / 1000) + 'KB)', contentDom);
                    }
                }
            }
        );
        return contentDom;
    }
};
