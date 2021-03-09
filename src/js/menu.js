((d) => {
  const $btn_menu = d.querySelector(".btn__menu"),
    $menu = d.querySelector(".header__menu");

  $btn_menu.addEventListener("click", (e) => {
    $btn_menu.firstElementChild.classList.toggle("none");
    $btn_menu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".header__menu a")) return false;
    $btn_menu.firstElementChild.classList.remove("none");
    $btn_menu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);
