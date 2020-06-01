const submission = document.querySelector('#submission');
const search = document.querySelector('#search');
const API_URL = 'http://localhost:5000/coronaPostList';
const API_URL_SEARCH = 'http://localhost:5000/coronaPostList/search';
const coronaPostListElement = document.querySelector('.coronaPostList'); //defined as a class of coronaPostList in index.html

listAllCoronaPostList();

submission.addEventListener('submit', (event) => { //event handler for submission form
    event.preventDefault();
    const formDataSubmission = new FormData(submission);
    const name = formDataSubmission.get('name');
    const content = formDataSubmission.get('content');

    const coronaPost = { // named coronaPost to keep distinct from post requests & avoid confusion
        name,
        content
    };

    const input = {
      "Title": name,
      "Subject": content
    };

    if(isNotEmpty(input)) {
      fetch(API_URL, { //posting to server, like $POST in jquery
        method: 'POST',
        body: JSON.stringify(coronaPost), //turning a js object into something the server can parse and understand
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json())
        .then(createdCoronaPost => {
          submission.reset();
          listAllCoronaPostList();
        });
    }
});

search.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDataSearch = new FormData(search);
    const searchParameter = formDataSearch.get('search');
    const params = `?queryString=${searchParameter}`;
    const searchURL = API_URL_SEARCH + params;
    const input = { "Search": searchParameter };

    if(isNotEmpty(input)) {
      fetch(searchURL, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json())
        .then(coronaPostList => {
            search.reset();
            coronaPostListElement.innerHTML = ''; //removes set of html dom elements

            if(coronaPostList.length !== 0) {
              displayPosts(coronaPostList);
            } else {
              displayEmptyFeed();
            }
        });
    }
});

function listAllCoronaPostList(){ //making a get req
    coronaPostListElement.innerHTML = ''; //removes set of html dom elements
    fetch(API_URL)
        .then(response => response.json())
        .then(coronaPostList => {
            displayPosts(coronaPostList);
        });
}

function displayPosts(postList) {
  postList.reverse(); //reverse order - most recent tweets at the top
  postList.forEach(coronaPost => { //for every element in this array, want to add it to page
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
}

function displayEmptyFeed() {
  const div = document.createElement('div');
  const contents = document.createElement('p');
  contents.className = "post-subtitle";
  contents.textContent = "Your feed is empty at the moment :'(";

  div.appendChild(contents);
  coronaPostListElement.appendChild(div);
}

/** Function checks inputs to verify that they are not empty
 *  @param: inputs(object) and object containing the inputFieldName and value
 *  returns a boolean
 **/
function isNotEmpty(inputs) {
  for (const inputFieldName in inputs) {
    if (inputs[inputFieldName].toString().trim() === "") {
      alert(`${inputFieldName} must be filled out`);
      return false;
    }
  }
  return true;
}