//const form = document.querySelector('form'); // grabbing an element on the page
// why queryselector, just convenient - look into others like on click
const submission = document.querySelector('#submission');
const search = document.querySelector('#search');
const API_URL = 'http://localhost:5000/mews';
const mewsElement = document.querySelector('.mews'); //defined as a class of mews in index.html

listAllMews();

submission.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDataSubmission = new FormData(submission);
    const name = formDataSubmission.get('name');
    const content = formDataSubmission.get('content');

    const mew = { //change name to submission object
        name,
        content
    };

    fetch(API_URL, { //posting to server, like $POST in jquery
      method: 'POST',
      body: JSON.stringify(mew), //turning a js object into smthn the server can parse and understand
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())  
      .then(createdMew => {
        submission.reset();
        listAllMews();
    });
});

search.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(search);
    const search = formData.get('search');

    fetch(API_URL + '/search', {
        method: 'GET',
        body: JSON.stringify(search),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())  
      .then(searchInput => {
      search.reset();
      console.log(searchInput);
      
  });
});

//function searchAllMews(searchInput){

// }

function listAllMews(){ //making a get req
    mewsElement.innerHTML = ''; //removes set of html dom elements WHY DOES THIS WORK
    fetch(API_URL) //lel whats going on here - watch vid, calling app.get
        .then(response => response.json())
        .then(mews => {
            mews.reverse(); //reverse order - most recent tweets at the top
            mews.forEach(mew => { //for every element in this array, want to add it to page
                const div = document.createElement('div');
                div.className = "post-preview";

                const header = document.createElement('h2');
                header.className = "post-title";
                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.className = "post-subtitle";
                contents.textContent = mew.content;

                const date = document.createElement('small');
                date.className = "post-meta";
                date.textContent = new Date(mew.created);

                div.appendChild(header); //each div has children of header n contents
                div.appendChild(contents);
                div.appendChild(date);
                div.appendChild(document.createElement('hr'));
                
                mewsElement.appendChild(div);

            })
        });
}