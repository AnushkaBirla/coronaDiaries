//const form = document.querySelector('form'); // grabbing an element on the page
// why queryselector, just convenient - look into others like on click
const submission = document.querySelector('#submission');
const search = document.querySelector('#search');
const API_URL = 'http://localhost:5000/coronaPostList';
const API_URL_SEARCH = 'http://localhost:5000/coronaPostList/search';
const coronaPostListElement = document.querySelector('.coronaPostList'); //defined as a class of coronaPostList in index.html

listAllcoronaPostList();

submission.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDataSubmission = new FormData(submission);
    const name = formDataSubmission.get('name');
    const content = formDataSubmission.get('content');

    const coronaPost = { // named CoronaPost to keep distinct from post requests & avoid confusion
        name,
        content
    };

    fetch(API_URL, { //posting to server, like $POST in jquery
      method: 'POST',
      body: JSON.stringify(coronaPost), //turning a js object into something the server can parse and understand
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())  
      .then(createdCoronaPost => {
        submission.reset();
        listAllcoronaPostList();
    });
});

search.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDataSearch = new FormData(search);
    const searchParameter = formDataSearch.get('search');

    let params = `?queryString=${searchParameter}`;
    searchURL = API_URL_SEARCH + params;

    fetch(searchURL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(coronaPostList => {
        coronaPostListElement.innerHTML = ''; //removes set of html dom elements WHY DOES THIS WORK
        coronaPostList.reverse(); //reverse order - most recent tweets at the top
        coronaPostList.forEach(coronaPost => { //for every element in this array, want to add it to page
            const div = document.createElement('div');
            div.className = "post-preview";

            const header = document.createElement('h2');
            header.className = "post-title";
            header.textContent = coronaPost.name;

            const contents = document.createElement('p');
            contents.className = "post-subtitle";
            contents.textContent = coronaPost.content;

            const date = document.createElement('small');
            date.className = "post-meta";
            date.textContent = new Date(coronaPost.created);

            div.appendChild(header); //each div has children of header n contents
            div.appendChild(contents);
            div.appendChild(date);
            div.appendChild(document.createElement('hr'));
            
            coronaPostListElement.appendChild(div);
      search.reset();
      
  });
});
});

function listAllcoronaPostList(){ //making a get req
    coronaPostListElement.innerHTML = ''; //removes set of html dom elements WHY DOES THIS WORK
    fetch(API_URL) //lel whats going on here - watch vid, calling app.get
        .then(response => response.json())
        .then(coronaPostList => {

            coronaPostList.reverse(); //reverse order - most recent tweets at the top
            coronaPostList.forEach(coronaPost => { //for every element in this array, want to add it to page
                const div = document.createElement('div');
                div.className = "post-preview";

                const header = document.createElement('h2');
                header.className = "post-title";
                header.textContent = coronaPost.name;

                const contents = document.createElement('p');
                contents.className = "post-subtitle";
                contents.textContent = coronaPost.content;

                const date = document.createElement('small');
                date.className = "post-meta";
                date.textContent = new Date(coronaPost.created);

                div.appendChild(header); //each div has children of header n contents
                div.appendChild(contents);
                div.appendChild(date);
                div.appendChild(document.createElement('hr'));
                
                coronaPostListElement.appendChild(div);

            })
        });
}