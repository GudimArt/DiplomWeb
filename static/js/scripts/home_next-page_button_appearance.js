$(window).scroll(function (event) {
    const buffer = 150
    let page_button = document.getElementById("home-page__button_next-page")
    let top = $(window).scrollTop();
    if(top >= window.innerHeight - buffer  && top<=window.innerHeight*2 - buffer){
        page_button.style.display = "inline-block"
        page_button.style.animation = "show_home-button_next-page 1s linear forwards"
    }
     else {
        page_button.style.animation = "close_home-button_next-page 1s linear forwards"
    }
})
