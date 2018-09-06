var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("http://www.artnews.com", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];

        $(".post-text-wrapper").each(function (i, element) {

            var head = $(this).children(".entry-title").text().trim();
            var sum = $(this).children(".entry-summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataAdd = {
                    headline = headNeat,
                    summary = sumNeat
                };
                articles.push(dataAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;