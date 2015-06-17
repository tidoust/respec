// Module core/aria-busy
// Marks the document as being busy during respec processing to 
// alleviate spurious DOM change event notifications to assistive
// technologies
// Introduced by Shane McCarron (shane@aptest.com) from the W3C PFWG

define(
    ["core/utils"], // load this to be sure that the jQuery extensions are loaded
    function (utils) {
        return {
            run:    function (conf, doc, cb, msg) {
                msg.pub("start", "core/aria-busy");
                // ensure head section is labelled
                $('body', doc).attr('aria-busy', 'true') ;
                respecEvents.sub("aria-busy", function () {
                    if (respecConfig && respecConfig.trace) console.log("Clearing aria-busy");
                    $('body', doc).attr('aria-busy', 'false') ;
                });
                msg.pub("end", "core/aria-busy");
                cb();
            }
        };
    }
);
