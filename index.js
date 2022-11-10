const toogleList = Array.from(document.querySelectorAll("li"));
console.log(toogleList);

toogleList.forEach((item) => {
  item.addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    console.log(current);
    current[0].className = current[0].className.replace("active", "");
    this.className += "active";
  });
});
