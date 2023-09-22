export function showMoreDeleteOptions(event) {
  const deleteToggle = document.querySelector(".remove-main-btn");
  const deleteMenu = document.querySelector(
    ".button-type-delete > .btn-collection"
  );

  deleteMenu.classList.toggle("btn-collection--active");


}
