async function getJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function showPeople(url = "https://swapi.dev/api/people") {
  getJSON(url)
  .then(listofPeople => {
    //Constructing the list of all 10 Stars Wars characters.
    const div = document.querySelector("div.people");
    div.innerHTML = " ";
    listofPeople.results.forEach(character => {
      let characterCard = renderOneCharacter(character);
      div.append(characterCard);
    })
    

    const previousButton = document.querySelector("#previous"); 
    const nextButton = document.querySelector("#next");
    
    //To disable the first page when there isn't any. If not, add the event listener.
    if (listofPeople.previous == null) {
      previousButton.disabled = true;
    } else {
      previousButton.disabled = false;
      previousButton.onclick = () => getPrevious();
    }
    //It will disable the last page or Next button, if there isn't any page left.ton.
    if (listofPeople.next == null) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
      nextButton.onclick = () => getNext();
    }

    //Function to retrieve the results from the previous page
    function getPrevious() {
      console.log(listofPeople.previous);
      showPeople(listofPeople.previous);
    }
    //This is a function to get the results for the next page.
    function getNext() {
      console.log(listofPeople.next);
      showPeople(listofPeople.next);
    }
   //This functin yields every star Wars character within the HTML
   function renderOneCharacter(character) {
     let newDiv = document.createElement("div");
     newDiv.classList.add("characterCard");
     newDiv.innerHTML = 
     `<h2>${character.name}</h2>
      <p>Gender: ${character.gender}</p>
      <p>Height: ${character.height}</p>
      <div class="hidden">
      <p>Mass: ${character.mass}</p>
      <p>Eye Color: ${character.eye_color}</p>
      <p>Hair Color: ${character.hair_color}</p>
      <p>Skin Color: ${character.skin_color}</p>
      </div>`;
       
      newDiv.addEventListener("click", () => {
        const hiddenDiv = newDiv.querySelector("div");
        hiddenDiv.classList.toggle("hidden");
      });
     return newDiv;}

  })}

function getPageUrls() {
  let pageDiv = document.querySelector("#page");
  for(let i=1; i < 10; i++) {
    let link = document.createElement("a");
    link.addEventListener("click", () => showPeople("https://swapi.dev/api/people/?page=" + i));
    link.innerHTML = i;
    pageDiv.append(link);
  }
}
showPeople();
getPageUrls();
