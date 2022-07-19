  
// clear all localstorage data
clearTasks = () => {
  localStorage.clear();
  location.reload();
}


const books = (function ($) {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=';
  return {
    fetched: [],
    data: [this.fields],
    searchterms: {},
    querystring: '',
    searching: false,
    fields: {
      title: true,
      authors: true,
      publisher: true,
      description: true,
      categories: true,
      publishedDate: true,
      previewLink: true,
      selfLink: true,
      ISBN: true,
      pageCount: true,
      printType: true,
    },
    filters: [
      { name: 'title', param: 'intitle', placeholder: 'Title', active: false },
      { name: 'authors', param: 'inauthor', placeholder: 'Authors', active: false },
      { name: 'category', param: 'subject', placeholder: 'Category', active: false},
      { name: 'publisher', param: 'inpublisher', placeholder: 'Publisher', active: false },
      { name: 'ISBN', param: 'isbn', placeholder: 'ISBN', active: false },
      { name: 'general', param: 'general', placeholder: 'All fields', active: false }
    ],
    searcharray: [],
    displayFilters: function (container_id) {
      let container = $('#' + container_id);
      for (var f = 0; f < this.filters.length; f++) {
        let filter = this.filters[f];
        let elm = $('<input>').
          attr('data-filter-id', f).
          prop('id', filter.name).
          prop('name', filter.param).
          prop('name', filter.param).
          prop('placeholder', filter.placeholder).
          prop('class', 'searchbox filter');
        container.append(elm);
      }
    },
    buildQueryString: function () {
      this.querystring = typeof this.searchterms.general !== 'undefined' ? this.searchterms.general : '';
      for (f in this.searchterms) {
        if (f !== 'general') {
          this.querystring += (this.querystring.length ? '+' : '') +
            f +
            ':' +
            this.searchterms[f];
        }
      }
    },
    handleSearch: function (classname) {
      $('.' + classname).keyup(function () {
        var that = $(this);
        setTimeout(function () {
          books.searching ? books.searching.abort() : '';
          books.searching = false;
          let val = that.val().replace(/\s/g, '%20');
          if (val.length > 1) {
            that.addClass('active');
            books.searchterms[that.prop('name')] = val;
          }
          else {
            that.removeClass('active');
            delete books.searchterms[that.prop('name')];
          }
          if (books.searchterms) {
            books.buildQueryString();
          }

          if (books.querystring) {
            books.get(books.querystring).
              then(function (response) {
                books.set(response);
                books.reset('filters');
                books.autocomplete('general');

                $('#general').autocomplete('search', '');
              });
          }
          else {
            books.clear('filters');

          }
        }, 700);
      });
    },

    get: function (querystring) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        this.searching = req;
        req.open('GET', url + querystring);
        req.onload = function () {
          if (req.status == 200) {
            var parsed = JSON.parse(req.response);
            resolve(parsed);
          }
          else {
            reject(Error(req.statusText));
          }
        };
        req.onerror = function () {
          reject(Error('Network Error'));
        };
        req.send();
      });
    },
    set: function (data) {
      this.fetched = data.items;
      this.data = this.fetched;
      for (book in this.data) {

        this.data[book] = this.data[book];
        let arr = [];
        for (field in this.fields) {
          let val = this.data[book][field];
          this.data[book][field] = Array.isArray(val) ? val.join(', ') : val;

          if (this.fields[field] && this.data[book].hasOwnProperty(field)) {
            arr.push(val);
          }
        }
        this.searcharray.push({
          label: arr.join(' | '),
          value: this.searcharray.length
        });
      }
    },
    reset: function (form_id) {
      if (typeof $('#general').autocomplete('instance') !== 'undefined') {
        $('#general').autocomplete('destroy');
      }
    },
    clear: function (form_id) {
      $('#' + form_id + ' input').each(function () {
        $(this).val('');
      });
    },
    autocomplete: function (id) {
      $('#' + id).autocomplete({
        minLength: 0,

        source: function (request, response) {
          response($.map(books.data, function (value, key) {
            return {
              label: value.volumeInfo.title,
              value: value.volumeInfo.title,
              title: value.volumeInfo.title,
              subtitle: value.volumeInfo.subtitle,
              authors: value.volumeInfo.authors,
              publisher: value.volumeInfo.publisher,
              description: value.volumeInfo.description,
              categories: value.volumeInfo.categories,
              publishedDate: value.volumeInfo.publishedDate,
              previewLink: value.volumeInfo.previewLink,
              selfLink: value.selfLink, 
              infoLink: value.volumeInfo.infoLink,
              pageCount: value.volumeInfo.pageCount,
              printType: value.volumeInfo.printType,
              ISBN: (typeof value.volumeInfo.industryIdentifiers !== 'undefined' ? value.volumeInfo.industryIdentifiers[0] : ''),
              image: (typeof value.volumeInfo.imageLinks !== 'undefined' ? value.volumeInfo.imageLinks.thumbnail : '')

            }
          }));
        },
        open: function () {
        },
        change: function (event, ui) {
        },
        close: function (event, ui) {
          $('.ui-menu').css('display', 'block');
        },
        appendTo: '#filters'
      }).
        data('ui-autocomplete')._renderItem = function (ul, item) {

          let info = `
                <div class="external">
                    <div class="internal"><a href="${item.infoLink}" target="_blank"><img class="book-thumbnail" src="${item.image === '' ? './img/image_preview.png' : item.image}" alt="${item.value}"/></a>
                         <div class="detail book-preview" ${typeof item.ISBN.identifier === 'undefined' ? 'hidden' : ''}><a href="javascript:void(0)" onClick="initialize(${item.ISBN.identifier}, '${item.title}')">Preview ${item.printType === undefined ? "" : item.printType}</a></div>
                    </div>
                   
                    <div class="internalDetail">
                         <div class="detail book-title">${item.title}</div>
                         <div class="detail" ${typeof item.subtitle === 'undefined' ? 'hidden' : ''}>${item.subtitle}</div>
                         <div class="detail book-authors" ${typeof item.authors === 'undefined' ? 'hidden' : ''}>by ${item.authors}</div>
                         <div class="detail" ${typeof item.publisher === 'undefined' ? 'hidden' : ''}>${item.publisher}</div>
                         <div class="detail" ${typeof item.publishedDate === 'undefined' ? 'hidden' : ''}>Published in ${item.publishedDate}</div>
                         <div class="detail book-categories"> ${item.categories === undefined ? "Others" : item.categories}</div>
                    </div>
                </div>`;
          return $('<li></li>').
            data('item.ui-autocomplete', item).
            append(info).
            appendTo(ul);
        }
    }
  }
})($);

$(document).ready(function () {
  books.displayFilters('filters');
  books.handleSearch('searchbox');

});


function initialize(isbn, title) {

  var x = screen.width / 2 - 700 / 2;
  var y = screen.height / 2 - 450 / 2;

  var myWindow = window.open("", "name", 'height=485,width=620,left=' + x + ',top=' + y);
  myWindow.document.write(`
  <script type="text/javascript" src="https://books.google.com/books/previewlib.js"></script>
  <script>GBS_setLanguage('en');</script>
  <script>GBS_insertEmbeddedViewer('ISBN:${isbn}',600,700);</script>`);
  myWindow.document.title = title;

  myWindow.focus();
  setTimeout(function () {
    myWindow.close();
  }, 15000);
}














    //Finding the next and previous buttons
    const previousButton = document.querySelector("#previous"); 
    const nextButton = document.querySelector("#next");
    
    //If this is the first page and there are no previous pages, disable the previous button; otherwise add an event listener to it.
    if (books.previous == null) {
      previousButton.disabled = true;
    } else {
      previousButton.disabled = false;
      previousButton.onclick = () => getPrevious();
    }
    
    //If this is the last page and there are no next pages, disable the next button; otherwise add an event listener to it.
    if (books.next == null) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
      nextButton.onclick = () => getNext();
    }

    //Function for getting the previous page's results
    function getPrevious() {
      console.log(response.previous);
      showPeople(response.previous);
    }
    
    //Function for getting the next page's results
    function getNext() {
      console.log(response.next);
      showPeople(response.next);
    }

    
function getPageUrls() {
  let pageDiv = document.querySelector("#pages");
  for(let i=1; i < 4; i++) {
    let link = document.createElement("a");
    link.addEventListener("click", () => showPeople("https://www.googleapis.com/books/v1/volumes?page="+1));
    link.innerHTML = i;
    pageDiv.append(link);
  }

}

books();
getPageUrls();



