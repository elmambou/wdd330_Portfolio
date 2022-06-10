import { hikeList } from './app5.js'
import Comment from './comment.js'

var comments = [];
const KEY = "hikes";

// On load grab the array and insert it into the page
window.addEventListener("load", () => {
  showHikeList();

  comments = JSON.parse(localStorage.getItem(KEY)) || [];   // Load comments from local storage

  showAllComments();
});


document.getElementById("submit-comment").addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.getElementById("comment-input");
    if (input.value === "") { 
      return;   // Nothing to see here.
    }

    let element = document.querySelector("#hikes > li > h2");
    let comment = new Comment(element.innerText, input.value);

    input.value = "";

    comments.push(comment);

    localStorage.setItem("hikes", JSON.stringify(comments));

    showHikeComments(element.innerText);
});


document.getElementById("hikes").addEventListener("click", (event) => {
    // Display detail
    if (event.target && event.target.nodeName != 'UL') {
        let listItem = event.target.closest('li');

        if (listItem.index == undefined) {
            listItem = listItem.parentElement.closest('li');
        }

        const hikeListElement = document.getElementById("hikes");
        hikeListElement.innerHTML = "";

        let hike = hikeList[listItem.index];

        const item = document.createElement("li");

        item.innerHTML = `<h2>${hike.name}</h2>
          <div class="item">
            <div class="big-image"><img class="big-img" src="${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          </div>
          <ul style="padding-left: 0">
              <li>
                  <h3>Description</h3>
                  <p>${hike.description}</p>
              </li>
              <li>
                  <strong>Distance:</strong>
                  ${hike.distance}
              </li>
              <li>
                  <strong>Difficulty:</strong>
                  ${hike.difficulty}
              </li>
              <li>
                  <h3>Directions</h3>
                  <p>${hike.directions}</p>
              </li>
          </ul>
          `;

        hikeListElement.appendChild(item);

        Array.from(document.getElementsByClassName("back")).forEach(e => e.classList.remove("hidden"));
        document.getElementById("comment-form").classList.remove("hidden");

        showHikeComments(hike.name);

        return item;
    }
});

function showHikeComments(hikeName) {
    // Show comments for this hike only.
    let hikeComments = comments.filter(c => c.name === hikeName);

    let section = document.getElementById("comments");

    if (hikeComments.length > 0) {
      section.classList.remove("hidden");
      let list = document.getElementById("comment-list");
      list.innerHTML = "";
    
      for (let comment of hikeComments) {
        let item = document.createElement("li");
        list.appendChild(item);
  
        item.innerHTML = `
          ${comment.comment}
        `;
            }
    } else { 
      section.classList.add("hidden");
    }
}

let elements = Array.from(document.getElementsByClassName("back"));
elements.forEach(element => {
  element.addEventListener("click", () => {
    showHikeList();
    showAllComments();
    elements.forEach(e => e.classList.add("hidden"));
    document.getElementById("comment-form").classList.add("hidden");
  });
});


function showHikeList() {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}

function showAllComments() {
  let section = document.getElementById("comments");
  let list = document.getElementById("comment-list");
  list.innerHTML = "";

  if (comments.length > 0) {
    section.classList.remove("hidden");

    for (let comment of comments) {
      let item = document.createElement("li");
      list.appendChild(item);

      item.innerHTML = `
        <strong>${comment.name}</strong>: ${comment.comment}
      `;
    }
  }
}

function renderHikeList(hikes, parent) {
  let index = 0;
  hikes.forEach(hike => {
    parent.appendChild(renderOneHike(hike, index++));
  });
}

function renderOneHike(hike, index) {
    const item = document.createElement("li");
    item.index = index;

    item.innerHTML = `<h2>${hike.name}</h2>
      <div class="item">
        <div class="image"><img class="img" src="${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div class="short-description">
        <ul>
                <li>
                    <strong>Distance:</strong>
                    ${hike.distance}
                </li>
                <li>
                    <strong>Difficulty:</strong>
                    ${hike.difficulty}
                </li>
        </ul>
        </div>
      </div><br>
      `;

    return item;
}
