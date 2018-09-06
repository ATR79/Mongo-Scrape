$(document).ready(function() {
    var articleContainer = $(".article-container");

$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.notes", handleArticleNotes);
$(document).on("click", "btn.save", handleNoteSave);
$(document).on("click", ".btn.note-delete", handleNoteDelete);

initPage();

function initPage(){
    articleContainer.empty();
    $.get("/api/headlines?aved=true").then(function(data) {
        if(data && data.length) {
            renderArticles(data);
        } else {
            renderEmpty();
        }
    });
}

function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
}

function createPanel(article) {
    var panel = 
    $(["<div class = 'panel panel-default'>",
    "<div class = 'panel-heading'>",
    "<h3>",
    article.headline,
    "<a class = 'btn btn-danger delete'>",
    "Delete From Saved",
    "</a>",
    "<a class = 'btn btn-info notes'>Article Notes</a>",
    "</h3>",
    "</div>",
    "<div class = 'panel-body'>",
    article.summary,
    "</div>",
    "</div>"
].join(""));

panel.data("_id", article._id);
return panel;
}

function renderEmpty() {
    var emptyAlert =
    $(["<div class = 'alert alert-warning text-center'>",
    "<h4>Ummm, nope. No saved articles here.</h4>",
    "</div>",
    "<div class = 'panel panel-default'>",
    "<div class = 'panel-heading text-center'>",
    "<h3>Would you like to see other available articles?</h3>",
    "</div>"    
    "<div class = 'panel-body text-center'>",
    "<h4><a href = '/'>Browse Articles</a></h4>",
    "</div>",
    "</div>"
].join(""));
articleContainer.append(emptyAlert);
}

function renderNoteList(data) {

    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
        currentNote = [
            "<li class = 'list-group-item'>",
            "No notes for this article yet.",
            "</li>"
        ].join("");
        notesToRender.push(currentNote);
    }
    else {
        for (var i = 0; i < data.notes.length; i++) {
            currentNote = $([
                "<li class = 'list-group-item note'>",
                data.notes[i].noteText,
                "<button class = 'btn btn-danger note-delete'>x<</button>",
                "</li>"
            ].join(""));
            currentNote.children("button").data("_id", data.notes[i]._id);
            notesToRender.push(currentNote);
        }
    }
    $(".note-container").append(notesToRender);
}

function handleArticleDelete() {
    
}
})
