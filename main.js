// Populating the Table
const bar = dummyData;
for (let i = 0; i < bar.length; i++) {
  if (bar[i].projectExpandable == true) {
    $("#project-table").append(`
    <div class="project-wrapper" id="${bar[i].id}" 
    data-year="${bar[i].year}"
    data-category="${bar[i].projectCategory}"
    data-title="${bar[i].projectTitle}"
    data-size="${bar[i].projectSize}"
    data-status="${bar[i].projectStatus}">
    <div class="project-row">
    <div class="project-col"><p>${bar[i].year}</p></div>
    <div class="project-col"><p>${bar[i].projectCategory}</p></div>
    <div class="project-col"><p>${bar[i].projectTitle}</p></div>
    <div class="project-col"><p>${bar[i].projectSize}</p></div>
    <div class="project-col expandable" id="${bar[i].id}-action"><p>${
      bar[i].projectStatus
    }</p></div>
    </div>

    <div class="expanded" id="${bar[i].id}-expand">
      <div class="project-details">
      <div class="text" id="expanded-text">
      <h1>${bar[i].projectTitle}</h1>
      <div id="expanded-summary-${bar[i].id}" class="summary">
      <h3>Summary</h3>
      <p>${bar[i].projectDetails[0].summary}</p>
      </div>
      <div class="expanded-award">
      <ul id="awards-list-${bar[i].id}">
      </ul>
      </div>
      </div>
      <div class="slider" id="expanded-slider">
      <img src="${bar[i].projectDetails[0].slider_images[0].imgOne[0].xs}" />
      </div>
      </div>
    </div>
  `);
    // After standard row gets appended, append the awards to the recently created #awards-list
    const awardsData = bar[i].projectDetails[0].awards;
    const awardsCount = bar[i].projectDetails[0].awards.length;

    for (let n = 0; n < awardsCount; n++) {
      $(`#awards-list-${bar[i].id}`).append(`
          <li>${awardsData[n].award_year} ${awardsData[n].award_title}</li>
      `);
    }

    $(`#${bar[i].id}-action`).click(() => {
      $(`#${bar[i].id}-expand`).slideToggle();
    });
  } else {
    $("#project-table").append(`
    <div class="project-wrapper" id="${bar[i].id}" 
    data-year="${bar[i].year}"
    data-category="${bar[i].projectCategory}"
    data-title="${bar[i].projectTitle}"
    data-size="${bar[i].projectSize}"
    data-status="${bar[i].projectStatus}">
    <div class="project-row">
    <div class="project-col"><p>${bar[i].year}</p></div>
    <div class="project-col"><p>${bar[i].projectCategory}</p></div>
    <div class="project-col"><p>${bar[i].projectTitle}</p></div>
    <div class="project-col"><p>${bar[i].projectSize}</p></div>
    <div class="project-col"><p>${bar[i].projectStatus}</p></div>
    </div>
    </div>
  `);
  }
}

// Mobile version populating

// Creates the top level year first
// Appends the remaining div matching the year attribute

// takes in the json/obj and key you want
function sortForMobile(json, key) {
  if (typeof json !== "object") {
    console.log("Requires a valid Object/JSON");
    return false;
  }
  // Get years from obj and store them in an array
  const tempArray = [];
  json.forEach(i => tempArray.push(i[key]));
  const returnArray = tempArray
    .filter((n, i) => tempArray.indexOf(n) === i)
    .sort()
    .reverse();
  return returnArray;
}
const mobileYears = sortForMobile(bar, "year");

for (let i = 0; i < mobileYears.length; i++) {
  $(".mobile-table").append(`
  <div class="project-top" id="m-year-${i}">
  <div class="year-group"><h1>${mobileYears[i]}</h1></div>
  <div class="project-row" id="m-row-${i}" data-myear="${mobileYears[i]}"></div>
  </div>
  `);
}
const tempBar = [];

for (let i = 0; i < bar.length; i++) {
  for (let j = 0; j < mobileYears.length; j++) {
    if (bar[i].year == mobileYears[j]) {
      if (bar[i].projectExpandable == true) {
        $(`#m-row-${j}`).append(`
        <div class="m-modal" id="m-modal-${bar[i].id}">${
          bar[i].projectTitle
        } Click Me!</div>
        <div class="m-modal-wrapper" id="m-modal-content-${bar[i].id}">
        <div class="m-modal-content">
        <div class="close">+</div>
        <h2>${bar[i].year}</h2>
        <h1>${bar[i].projectTitle}</h1>
        <p>Modal Content</p>
        </div>
        </div>
      `);
        $(`#m-modal-${bar[i].id}`).click(() => {
          $(`#m-modal-content-${bar[i].id}`).show();
        });
        $(`#m-modal-content-${bar[i].id}`).click(() => {
          $(`#m-modal-content-${bar[i].id}`).hide();
        });
      } else {
        $(`#m-row-${j}`).append(`
      <div>${bar[i].projectTitle}</div>
      `);
      }
    }
  }
}

// @Misc
// Test function for static element not added in by the for loop above
// Remove in production

$("#0-action").click(() => {
  $("#0-expand").slideToggle();
});

// @Sorting
// Sorts all divs elements based on the value in the datasets

const getParentNode = document.getElementById("project-table");
const getChildrenNodes = getParentNode.children;

const sortingOptions = {
  year: $("#sortYear"),
  category: $("#sortCategory"),
  title: $("#sortTitle"),
  size: $("#sortSize"),
  status: $("#sortStatus")
};

// Sorting Function
// Requires 3 arguments:
// the parent div
// the children div
// sortby Data

// You still have to add the cases yourself depending on what you want it to sort by

function sortMe(parent, children, sortBy) {
  const sortArray = [];
  for (let i = 0; i < children.length; i++) {
    sortArray.push(children[i]);
  }
  switch (sortBy) {
    case "year":
      if (year[0].dataset.sortby == "desc") {
        sortArray
          .sort((a, b) => a.dataset.year - b.dataset.year)
          .map(node => parent.appendChild(node));
        year[0].dataset.sortby = "asc";
      } else if (year[0].dataset.sortby == "asc") {
        sortArray
          .sort((a, b) => b.dataset.year - a.dataset.year)
          .map(node => parent.appendChild(node));
        year[0].dataset.sortby = "desc";
      }
      break;

    case "category":
      if (category[0].dataset.sortby == "desc") {
        sortArray
          .sort((a, b) => {
            if (a.dataset.category < b.dataset.category) {
              return -1;
            }
            if (a.dataset.category > b.dataset.category) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        category[0].dataset.sortby = "asc";
      } else if (category[0].dataset.sortby == "asc") {
        sortArray
          .sort((a, b) => {
            if (a.dataset.category > b.dataset.category) {
              return -1;
            }
            if (a.dataset.category < b.dataset.category) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        category[0].dataset.sortby = "desc";
      }
      break;

    case "size":
      if (size[0].dataset.sortby == "desc") {
        sortArray
          .sort(
            (a, b) =>
              formatString(a.dataset.size) - formatString(b.dataset.size)
          )
          .map(node => parent.appendChild(node));
        size[0].dataset.sortby = "asc";
      } else if (size[0].dataset.sortby == "asc") {
        sortArray
          .sort(
            (a, b) =>
              formatString(b.dataset.size) - formatString(a.dataset.size)
          )
          .map(node => parent.appendChild(node));
        size[0].dataset.sortby = "desc";
      }

      break;

    case "title":
      if (title[0].dataset.sortby == "desc") {
        sortArray
          .sort((a, b) => {
            if (lowerCase(a.dataset.title) < lowerCase(b.dataset.title)) {
              return -1;
            }
            if (lowerCase(a.dataset.title) > lowerCase(b.dataset.title)) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        title[0].dataset.sortby = "asc";
      } else if (title[0].dataset.sortby == "asc") {
        sortArray
          .sort((a, b) => {
            if (lowerCase(a.dataset.title) > lowerCase(b.dataset.title)) {
              return -1;
            }
            if (lowerCase(a.dataset.title) < lowerCase(b.dataset.title)) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        title[0].dataset.sortby = "desc";
      }

      break;

    case "status":
      if (status[0].dataset.sortby == "desc") {
        sortArray
          .sort((a, b) => {
            if (lowerCase(a.dataset.status) < lowerCase(b.dataset.status)) {
              return -1;
            }
            if (lowerCase(a.dataset.status) > lowerCase(b.dataset.status)) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        status[0].dataset.sortby = "asc";
      } else if (status[0].dataset.sortby == "asc") {
        sortArray
          .sort((a, b) => {
            if (lowerCase(a.dataset.status) > lowerCase(b.dataset.status)) {
              return -1;
            }
            if (lowerCase(a.dataset.status) < lowerCase(b.dataset.status)) {
              return 1;
            }
            return 0;
          })
          .map(node => parent.appendChild(node));
        status[0].dataset.sortby = "desc";
      }
      break;

    default:
      console.log("specify the data you want to be sorted by");
  }
}

// Click events initializers
// Deconstructing for use when initializing click events
const { year, category, title, size, status } = sortingOptions;

$(year).click(() => {
  sortMe(getParentNode, getChildrenNodes, "year");
});
$(category).click(() => {
  sortMe(getParentNode, getChildrenNodes, "category");
});
$(title).click(() => {
  sortMe(getParentNode, getChildrenNodes, "title");
});
$(size).click(() => {
  sortMe(getParentNode, getChildrenNodes, "size");
});
$(status).click(() => {
  sortMe(getParentNode, getChildrenNodes, "status");
});

// Removes any alphabets, commas, from a string.
// Returns a string
// Example:
// formatString("20,000 SQM") will return you with "20000"
function formatString(arg) {
  if (arg) {
    return arg.replace(/[^\d]/g, "");
  }
}

function lowerCase(arg) {
  if (arg) {
    return arg.toLowerCase();
  }
}
