let tabLinks = document.querySelectorAll(".school-curriculum-main-block-content-controller-types-school-class__item");
let tabPanels = document.querySelectorAll(".school-curriculum-main-block-content__subsection");


for(let el of tabLinks) {
  el.addEventListener("click", e => {
    e.preventDefault();
     
    for(let tabLink of tabLinks){
        tabLink.classList.remove("active");
    }
    for(let tabPanel of tabPanels){
        tabPanel.classList.remove("active");
    }

    el.classList.add("active");

    for(let tabPanel of tabPanels){
        if (tabPanel.getAttribute("data-index") === el.getAttribute("data-index")){
            tabPanel.classList.add("active");
        }
    }
  });
}