let themes_subject_title = document.querySelectorAll(".themes_subject_item__title");
for(let theme_subject_title of themes_subject_title) {
    theme_subject_title.addEventListener("click", e => {
        e.preventDefault();
        if(theme_subject_title.classList.contains('active')){
            theme_subject_title.classList.remove('active');
            themes_subject__item = theme_subject_title.parentNode;
            themes_subject_item__description = themes_subject__item.querySelector(".themes_subject_item__description");
            themes_subject_item__description.style.display = 'none'
            themes_subject_item__description.classList.remove('active');
        }
        else{
            theme_subject_title.classList.add('active');
            themes_subject__item = theme_subject_title.parentNode;
            themes_subject_item__description = themes_subject__item.querySelector(".themes_subject_item__description");
            themes_subject_item__description.style.display = 'flex'
            themes_subject_item__description.classList.add('active');
        }
    })
};