var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createPostSnippet(post) {
    var date = new Date(post.date)

    var snippet = $('<a>', {
        class: "post-snippet",
        href: "/hello"
    });
    var columns = $('<div>', {
        class: "columns is-mobile"
    });
    var icon_column = $('<div>', {
        id: "icon-col",
        class: "column",
        html: [
            $("<span>", {
                class: "fa fa-"+post.icon
            })
        ]
    });
    var date_column = $('<div>', {
        id: "date-col",
        class: "column is-2",
        html: [
            $("<div>", { id: "day", html: date.getDate() }),
            $("<div>", { id: "month", html: months[date.getMonth()] }),
            $("<div>", { id: "year", html: date.getFullYear() }),
        ]
    });
    var main_column = $('<div>', {
        id: "main-col",
        class: "column",
        html: [
            $('<div>', {
                class: "title is-4",
                html: post.title
            }),
            $('<div>', {
                class: "excerpt",
                html: post.excerpt
            })
        ]
    })

    snippet.append(columns)
    columns.append(icon_column, date_column, main_column)
    $('.snippets').append(snippet)
}

function addCategory(name) {
    var category = $('<li>', {
        class: "item",
        html: $("<a>", {
            html: name
        })
    })
    $(".blog-roll .tabs ul").append(category)
}

$(function() {
    // Hide non-js user elements. Show js user elements
    $('.js').show();
    $('.no-js').hide();

    var posts = []
    var totalPosts = -1;
    var perPage = parseInt($('posts-per-page').text());
    var postsShowing = parseInt($('posts-showing').text());

    var categories = []

    $.getJSON("/api/posts.json", function(data) {
        posts = data;
        totalPosts = data.length;
        if (postsShowing >= totalPosts)
            $('#pagination-more-button').hide()
    })

    $.getJSON("/api/categories.json", function(data) {
        categories = data
        for (category of categories)
            addCategory(category)
        $('.blog-roll .tabs .item').click(function() {
            $('.blog-roll .tabs .item').removeClass('is-active')
            $(this).addClass('is-active');
        });
    })

    $('#pagination-more-button').click(function() {
        if ( totalPosts == -1 || postsShowing == totalPosts )
            return;
        var loopMax = postsShowing+perPage < posts.length ? postsShowing+perPage : posts.length;

        for ( i=postsShowing; i < loopMax; i++)
            createPostSnippet( posts[i] )

        postsShowing = loopMax
        if (postsShowing >= totalPosts)
            $('#pagination-more-button').hide()
    });
})
