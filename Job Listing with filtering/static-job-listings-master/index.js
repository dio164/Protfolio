let filteredItems = [];
let criteria = document.getElementsByClassName("req");
let filterContainer = document.getElementById("filter-contain");
let clearFilters = document.getElementById("clear");
let jobContainer = document.getElementsByClassName("job-container");
let filterBtn = document.getElementById("filter-btn");
let dropdown = document.getElementById("dropdown-menu");

dropdown.classList.add("hide");

for (let i = 0; i < criteria.length; i++) {
  criteria[i].addEventListener("click", function () {
    //console.log(criteria[i]);
    //console.log(this.innerHTML);
    if (!filteredItems.includes(this.innerHTML)) {
      filteredItems.push(this.innerHTML);
      createFilter(this.innerHTML);
      filterJobs(filteredItems);
    }
  });
}

function createFilter(filterName) {
  let filterCheck = doesFilterExist(filterName);
  if (filterCheck === false) {
    //console.log(!filterCheck);
    //console.log(filterCheck);
    let filterItems = document.createElement("div");
    let filter = document.createElement("div");
    let closeBtn = document.createElement("i");
    filterItems.classList.add("filter-items");
    filter.classList.add("filter");
    closeBtn.classList.add("fa-solid", "fa-xmark");
    filter.innerHTML = filterName;
    filterItems.appendChild(filter);
    filterItems.appendChild(closeBtn);
    filterContainer.appendChild(filterItems);
    //console.log(filteredItems);
    //console.log(filteredItems.indexOf(filterName));

    closeBtn.addEventListener("click", function () {
      let index = filteredItems.indexOf(filterName);
      filterContainer.removeChild(filterItems);
      filteredItems.splice(index, 1);
      //console.log(filteredItems);
      filterJobs(filteredItems);
    });

    clearFilters.addEventListener("click", function () {
      filteredItems = [];
      //console.log(filteredItems);
      while (filterContainer.firstChild) {
        filterContainer.removeChild(filterContainer.firstChild);
      }
      for (let i = 0; i < jobContainer.length; i++) {
        jobContainer[i].classList.remove("hide");
      }
    });
  }
}

function doesFilterExist(filterName) {
  let filters = document.querySelectorAll(".filter");
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].innerHTML === filterName) {
      return true;
    }
  }
  return false;
}

function filterJobs(skills) {
  for (let i = 0; i < jobContainer.length; i++) {
    let job = jobContainer[i];
    //console.log(job);
    let jobSkills = Array.from(job.querySelectorAll(".req")).map(
      (req) => req.textContent
    );
    //console.log(jobSkills);
    let showJob = skills.every((skill) => jobSkills.includes(skill));
    //console.log(showJob);

    if (showJob) {
      job.classList.remove("hide");
    } else {
      job.classList.toggle("hide");
    }
  }
}



filterBtn.addEventListener("click", function () {
  dropdown.classList.toggle("hide");
});
