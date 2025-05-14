export function showMoreSortOptions(event) {
  const sortToggle = document.querySelector(".sort-main-btn");
  const sortMenu = document.querySelector(
    ".button-type-sort > .btn-collection"
  );

  sortMenu.classList.toggle("btn-collection--active");
}
