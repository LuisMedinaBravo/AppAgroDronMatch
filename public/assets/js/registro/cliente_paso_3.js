function toggleDropdown(button) {
    button.classList.toggle("show");
    button.nextElementSibling.classList.toggle("show");
}

function selectOption(option) {
    const button = option.parentNode.previousElementSibling;
    button.textContent = option.textContent;
    button.setAttribute("value", option.getAttribute("value"));
    toggleDropdown(button);
}