/**
 * Created by adiog on 28.03.17.
 */

const ScreenshotMetaType = {
    content: function (ecmaItem) {
        let contentDom = null;
        ecmaItem.itemBean.files.some(
            function (file) {
                if (file.filename === "screenshot.png") {
                    let src = env.HTTPS_CDN_QUICKSAVE_IO + '/' + ecmaItem.itemBean.meta.user_hash + '/' + ecmaItem.itemBean.meta.meta_hash + '/' + file.file_hash + '/' + file.filename;
                    contentDom = img({src: src, class: 'sizedimg'});
                }
            }
        );
        return contentDom;
    }
};