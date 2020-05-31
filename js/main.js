document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {

    // Prevent form from submitting
    
    e.preventDefault();

    // Get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    
    // Validation - we prevent the saving of empty fields
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

        var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //Recap -Local Storage: functions - explications
        // save item to LS
        localStorage.setItem('test', 'hello world');
        // obtain item from LS
        console.log(localStorage.getItem('test'));
        // delete item from LS
        localStorage.removeItem('test');
        console.log(localStorage.removeItem('test')); //-> null

    */
// in 'bookmarks' vom salva intrarile 'bookmark' 
    // Test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    // set to LS
        // transformam din array in string, doar stringuri pot fi salvate in LS
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
   } else {
       // if bookmarks contains already some items, first we get them from LS; than add the new entry; send back to LS
            // Get bookmarks from LS, but we also have to transform back from string to array
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            // Add new bookmark to existing array
            bookmarks.push(bookmark);
            // Re-set back to LS
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
   }

   // Clear form
   document.getElementById('myForm').reset();
   
   //Re-fetch bookmarks from LS
   fetchBookmarks();
}


// deleteBookmark function

function deleteBookmark(url){
    // Get bookmarks from LS
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks, and verify if the provided uRL match one URL form bookmarks, if YES this has to be deleted; because with delete button we send an URL and call function: deleteBookmark(url)
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to LS - after we deleted the bookmark, we save back the remaining values to LS
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 

    // now the object is deleted from LS but it remains on the screen until we reload page; to avoid this, we call again the function fetchBookmarks, which obtain the new value of LS
        //Re-fetch bookmarks from LS
        fetchBookmarks();
}


// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from LS
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="d-block m-2 p-1 pt-2 bg-secondary text-white rounded">'+
                                      '<h3>' + name + '&nbsp;' +
                                      '<a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> ' +
                                      '<a onclick="deleteBookmark(\''+ url +'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';
    }
}

// Validation

function validateForm(siteName, siteUrl){

    if(!siteName || !siteUrl) {
        alert("Please fill in the form !");
        return false; // with this we block the execution
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
