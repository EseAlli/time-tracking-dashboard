const toogleList = Array.from(document.querySelectorAll("li"));
const cards = Array.from(document.querySelectorAll(".card"));
let time = "weekly";
let data;

async function getData() {
  let response = await fetch("./data.json");
  data = await response.json();
  updateDOM(time);
}

getData();

toogleList.forEach((item) => {
  item.addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += "active";
    time = this.innerHTML.toLowerCase();
    updateDOM(time);
  });
});

function updateDOM(time) {
  cards.forEach((card) => {
    let cardTitleTag = card.getElementsByClassName("title").item(0);
    let cardTitle = cardTitleTag.innerHTML;
    let current = card.getElementsByClassName("current").item(0);
    let previous = card.getElementsByClassName("previous-hr").item(0);
    let previousTag = card.getElementsByClassName("previous").item(0);
    let [cardInfo] = data.filter((d) => d.title === cardTitle);
    let { timeframes } = cardInfo;
    current.firstChild.nodeValue = timeframes[time].current;
    previous.innerHTML = `${timeframes[time].previous}hrs`;

    switch (time) {
      case "weekly":
        previousTag.firstChild.nodeValue = "Last Week";
        break;
      case "daily":
        previousTag.firstChild.nodeValue = "Yesterday";
        break;
      case "monthly":
        previousTag.firstChild.nodeValue = "Last Month";
        break;
    }
  });
}
