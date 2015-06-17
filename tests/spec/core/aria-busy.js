describe("Core - Aria-busy", function () {
    var MAXOUT = 5000
    ,   basicConfig = {
            editors:    [{ name: "Robin Berjon" }]
        ,   specStatus: "WD"
//        ,   doRDFa:  false
        }
    ,   body = "<section class='introductory'><h2>INTRO</h2></section>" +
              "<section><h2>ONE</h2><section><h2>TWO</h2><section><h2>THREE</h2><section><h2>FOUR</h2>" +
              "<section><h2>FIVE</h2><section><h2>SIX</h2></section></section></section></section></section></section>" +
              "<section class='notoc'><h2>Not in TOC</h2></section>" +
              "<section class='appendix'><h2>ONE</h2><section><h2>TWO</h2><section><h2>THREE</h2><section>" +
              "<h2>FOUR</h2><section><h2>FIVE</h2><section><h2>SIX</h2><p>[[DAHUT]]</p><p>[[!HTML5]]</p></section></section></section>" +
              "</section></section></section>"
    ,   wasTrue = 0;
    ;
    window.addEventListener("message", function(ev) {
        if (ev.data && ev.data.topic == "end" && ev.data.args[0] == "core/aria-busy") {
            // assume that if we get the core/aria-busy end message, the attribute is set
            wasTrue = 1;
        }
    });
    it("should have set aria-busy to true at start and cleared aria-busy when done", function () {
        var doc;
        runs(function () {
            makeRSDoc({ config: basicConfig, body: body }, function (rsdoc) { doc = rsdoc; });
        });
        waitsFor(function () { return doc; }, MAXOUT);
        // test default values
        runs(function () {
            expect(wasTrue).toEqual(1);
            var $body = $("body", doc);
            expect($body.attr('aria-busy')).toEqual("false");
            flushIframes();
        });
    });
});
