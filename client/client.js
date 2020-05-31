console.log("hello")
const form = document.querySelector('form'); // grabbing an element on the page
// why queryselector, just convenient - look into others like on click
const API_URL = 'http://localhost:5000/mews';
const mewsElement = document.querySelector('.mews'); //defined as a class of mews in index.html

listAllMews();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
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
        console.log(createdMew);
        form.reset();
        listAllMews();
    });
});

function listAllMews(){ //making a get req
    mewsElement.innerHTML = ''; //removes set of html dom elements WHY DOES THIS WORK
    fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            console.log(mews);
            mews.reverse(); //reverse order - most recent tweets at the top
            mews.forEach(mew => { //for every element in this array, want to add it to page
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.textContent = mew.content;

                const date = document.createElement('small');
                date.textContent = new Date(mew.created);

                div.appendChild(header); //each div has children of header n contents
                div.appendChild(contents);
                div.appendChild(date);
                
                mewsElement.appendChild(div);

            })
        });
}