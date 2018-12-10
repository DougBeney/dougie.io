const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var showingFilteredView = false;
var posts = [];
var categories = [];
var currentCategory;
var totalPosts = -1;
var totalCatPosts = 0;
var perPage, All_postsShowing, Cat_postsShowing;

function createPostSnippet(post, container=".snippets#all-posts") {
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
    $(container).append(snippet)
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
    perPage = parseInt($('posts-per-page').text());
    All_postsShowing = parseInt($('posts-showing').text());

    $.getJSON("/api/posts.json", function(data) {
        posts = data;
        totalPosts = data.length;
        if (All_postsShowing >= totalPosts)
            $('#pagination-more-button').hide()
        else
            $('#pagination-more-button').show()
    })

    $.getJSON("/api/categories.json", function(data) {
        categories = data
        for (category of categories)
            addCategory(category)

        // A category tab is clicked
        $('.blog-roll .tabs .item').click(function() {
            // Exit if user clicked on the active item.
            if ( $(this).text() == $('.blog-roll .tabs .is-active').text() )
                return;

            $('.blog-roll .tabs .item').removeClass('is-active')
            $(this).addClass('is-active');

            var allPostsList = $(".snippets#all-posts");
            var catPostsList = $(".snippets#categorized");

            if ( $(this).attr('id') == 'All' ) {
                showingFilteredView = false;
                allPostsList.show();
                catPostsList.hide();
                if (All_postsShowing >= totalPosts)
                    $('#pagination-more-button').hide()
                else
                    $('#pagination-more-button').show()
            } else {
                showingFilteredView = true;
                allPostsList.hide();
                catPostsList.show();

                // Clear
                catPostsList.html('');
                totalCatPosts = 0;
                Cat_postsShowing = 0;

                currentCategory = $(this).text();
                for ( post of posts ) {
                    if ( post.category.includes(currentCategory) ) {
                        if ( Cat_postsShowing < perPage ) {
                            createPostSnippet(post, ".snippets#categorized");
                            Cat_postsShowing++;
                        }
                        totalCatPosts++;
                    }
                }
                if (Cat_postsShowing == 0)
                    catPostsList.html('<p>No posts matched that criteria.</p>');
                if (Cat_postsShowing >= totalCatPosts)
                    $('#pagination-more-button').hide()
                else
                    $('#pagination-more-button').show()
            }

        });
    })

    $('#pagination-more-button').click(function() {
        if ( showingFilteredView) {
            if ( totalCatPosts == 0 || Cat_postsShowing == totalCatPosts )
                return;
            var pagesAdded = 0;
            var postsMatched;
            var currentPostsShowing = Cat_postsShowing

            for ( post of posts ) {
                if ( post.category.includes( currentCategory ) ) {
                    pagesAdded++;
                    if ( pagesAdded > Cat_postsShowing &&
                         Cat_postsShowing-currentPostsShowing < perPage) {
                        createPostSnippet(post, ".snippets#categorized");
                        Cat_postsShowing++;
                    }
                }
            }

            if (Cat_postsShowing >= totalCatPosts)
                $('#pagination-more-button').hide()
            else
                $('#pagination-more-button').show()
        } else {
            if ( totalPosts == -1 || All_postsShowing == totalPosts )
                return;
            var loopMax = All_postsShowing+perPage < posts.length ? All_postsShowing+perPage : posts.length;

            for ( i=All_postsShowing; i < loopMax; i++)
                createPostSnippet( posts[i] )

            All_postsShowing = loopMax
            if (All_postsShowing >= totalPosts)
                $('#pagination-more-button').hide()
            else
                $('#pagination-more-button').show()
        }
    });
})
