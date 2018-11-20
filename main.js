for (let i = 0; i < bar.length; i++) {
  console.log(bar[i].projectExpandable + " " + bar[i].id);
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
      <p>${bar[i].projectDetails[0].summary}</p>
      </div>
    </div>
  `);
    $(`#${bar[i].id}-action`).click(() => {
      $(`#${bar[i].id}-expand`).slideToggle("fast");
    });
  } else {
    $("#project-table").append(`
    <div class="project-wrapper" id="${bar[i].id}">
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

// Testing before getting images from

$("#0-action").click(() => {
  $("#0-expand").slideToggle();
});

// @Sorting

const getParentNode = document.getElementById("project-table");
const getChildrenNodes = getParentNode.children;

const sortingOptions = {
  year: $("#sortYear"),
  category: $("#sortCategory"),
  title: $("#sortTitle"),
  size: $("#sortSize"),
  status: $("#sortStatus")
};

const { year, category, title, size, status } = sortingOptions;

function sortMe(parent, children, sortBy) {
  const sortArray = [];
  for (let i = 0; i < children.length; i++) {
    sortArray.push(children[i]);
  }
  switch (sortBy) {
    case "year":
      sortArray
        .sort((a, b) => a.dataset.year - b.dataset.year)
        .map(node => parent.appendChild(node));
      break;

    case "category":
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
      break;

    case "size":
      sortArray
        .sort(
          (a, b) => formatString(a.dataset.size) - formatString(b.dataset.size)
        )
        .map(node => parent.appendChild(node));
      break;

    case "title":
      sortArray
        .sort((a, b) => {
          if (a.dataset.title < b.dataset.title) {
            return -1;
          }
          if (a.dataset.title > b.dataset.title) {
            return 1;
          }
          return 0;
        })
        .map(node => parent.appendChild(node));
      break;

    case "status":
      sortArray
        .sort((a, b) => {
          if (a.dataset.status < b.dataset.status) {
            return -1;
          }
          if (a.dataset.status > b.dataset.status) {
            return 1;
          }
          return 0;
        })
        .map(node => parent.appendChild(node));
      break;

    default:
      console.log("specify the data you want to be sorted by");
  }
}

function formatString(arg) {
  if (arg) {
    return arg.replace(/[^\d]/g, "");
  }
}

formatString("200,000 sqm");

// Initialize

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
