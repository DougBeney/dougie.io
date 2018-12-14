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
        href: post.url
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
    postType =$('posts-type').text();
    perPage = parseInt($('posts-per-page').text());
    All_postsShowing = parseInt($('posts-showing').text());

    var apiEndpoint_posts;
    var apiEndpoint_cats;

    if ( postType == 'blog' ) {
        apiEndpoint_posts = '/api/posts.json';
        apiEndpoint_cats = '/api/categories.json';
    }
    else if ( postType == 'notes' ) {
        apiEndpoint_posts = '/api/notes.json';
        apiEndpoint_cats = '/api/note_categories.json';
    }

    $.getJSON(apiEndpoint_posts, function(data) {
        posts = data;
        totalPosts = data.length;
        if (All_postsShowing >= totalPosts)
            $('#pagination-more-button').hide()
        else
            $('#pagination-more-button').show()

        // Printing to console for fun:
        var type = 'posts';
        if ( apiEndpoint_posts == '/api/notes.json' )
            type = 'notes';
        console.log("Here are the latest", type+":");
        for ( i=0; i<posts.length; i++ ) {
            if ( i >= 5 )
                break;
            console.log(
                (i+1).toString()+".)", // 1.)
                "'"+posts[i].title+"'\n\thttps://dougie.io"+posts[i].url // 'TITLE'\n\thttps://dougie.io/mypost
            );
        }
    })

    $.getJSON(apiEndpoint_cats, function(data) {
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
            var searchPostsList = $(".snippets#search-results");

            if ( $(this).attr('id') == 'All' ) {
                showingFilteredView = false;
                allPostsList.show();
                catPostsList.hide();
                searchPostsList.hide();

                if (All_postsShowing >= totalPosts)
                    $('#pagination-more-button').hide()
                else
                    $('#pagination-more-button').show()
            } else {
                showingFilteredView = true;
                allPostsList.hide();
                catPostsList.show();
                searchPostsList.hide();

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

    // Search blog posts
    $('#search').on('keyup', function() {
        var query = $(this).val();
        if ( query.trim() == "" ) {
            $('.blog-roll .tabs .item#All').click();
            return;
        }

        $('.blog-roll .tabs .item').removeClass('is-active')

        var allPostsList = $(".snippets#all-posts");
        var catPostsList = $(".snippets#categorized");
        var searchPostsList = $(".snippets#search-results");

        allPostsList.hide();
        catPostsList.hide();
        searchPostsList.show();

        $(searchPostsList).html('<h1 class="title is-2">Search results for "'+query+'"</h1>');

        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "title",
                "content",
                "author"
            ]
        };
        var fuse = new Fuse(posts, options); // "list" is the item array
        var result = fuse.search(query);

        for (post of result) {
            createPostSnippet(post, ".snippets#search-results");
        }

        if ( result.length == 0 )
            searchPostsList.append($("<p>", {html: "No results found. :("}));
    })
})
