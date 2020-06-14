//select elements

const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

const base = "https://en.wikipedia.org/w/api.php";
const url = "?action=query&format=json&origin=*&list=search&srsearch=";

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (search.value === "") {
    showAlert();
  } else {
    loading.classList.add("showItem");
    const inputValue = search.value;
    search.value = "";
    getDataApi(inputValue);
  }
});

// display alert on top
function showAlert() {
  feedback.classList.add("showItem");
  feedback.textContent = "please enter a value";
  setTimeout(function () {
    feedback.classList.remove("showItem");
  }, 3000);
}

//call api
function getDataApi(inputValue) {
  const completeURL = base + url + inputValue;
  fetch(completeURL)
    .then(function (promiseObject) {
      return promiseObject.json();
    })
    .then(function (data) {
      if (data !== "") {
        loading.classList.remove("showItem");
      }
      // destructure data
      dataDestructure(data);
    })
    .catch(function () {});
}

// destructure data
function dataDestructure(data) {
  const { search: results } = data.query;
  const pageID = "http://en.wikipedia.org/?curid=";
  let info = "";
  results.forEach(function (result) {
    info += ` <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
          <div class="card card-body">
            <h1 class="card-title blueText">${result.title}</h1>
            <p>
              ${result.snippet}
            </p>
            <a href="${pageID}${result.pageid}" target="_blank" class="my-2 text-capitalize"
              >read more...</a
            >
          </div>
        </div>`;
  });
  output.innerHTML = info;
}
