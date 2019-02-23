function toggleMenuLights(lightsOn) {
    document.getElementById('menu-dimmer').classList.toggle('on', lightsOn);
}

function initDropdown(dropdown, menuItem) {
    let searchBar = document.getElementById('search-dropdown');
    let dimmer = document.getElementById('menu-dimmer');
    let isMouseOverMenu = false;
    let isMouseOverDropDown = false;
    let timeoutId;


    menuItem.addEventListener("click", () => {
        isMouseOverMenu = true;
        searchBar.style.display = 'none';

        toggleMenuLights(!dropdown.classList.contains("dropdown-content-show"));
        dropdown.classList.toggle('dropdown-content-show', !dropdown.classList.contains("dropdown-content-show"));

        timeoutId = null;
    });

    menuItem.addEventListener("mouseenter",() => {
        isMouseOverMenu = true;

        if (document.getElementsByClassName("dropdown-content-show").length > 0) {
            dropdown.classList.add('dropdown-content-show');
            toggleMenuLights(true);
        } else {
            timeoutId = window.setTimeout(() => {
                searchBar.style.display = 'none';
                toggleMenuLights(true);
                dropdown.classList.add('dropdown-content-show');
            }, 800);
        }
    });

    menuItem.addEventListener("mouseleave",() => {
        isMouseOverMenu = false;
        clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            if (!isMouseOverDropDown) {
                toggleMenuLights(false);
                dropdown.classList.remove('dropdown-content-show');
            }
        }, 50);
    });

    dropdown.addEventListener("mouseenter", () => isMouseOverDropDown = true);

    dropdown.addEventListener("mouseleave", () => {
        isMouseOverDropDown = false;
        clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            if (!isMouseOverMenu) {
                dropdown.classList.remove('dropdown-content-show');

                if (!document.getElementsByClassName("dropdown-content-show").length > 0) {
                    toggleMenuLights(false);
                }
            }
        }, 50);
    });
}

function initSearchBar() {
    let searchBar = document.getElementById('search-bar');
    let dropdown = document.getElementById('search-dropdown');

    window.onresize = () => adjustSearchBar(dropdown, searchBar.getBoundingClientRect());

    searchBar.addEventListener('input', () => {
        if (searchBar.value === '') {
            dropdown.style.display = 'none';
        } else {
            Array.prototype.forEach.call(document.getElementsByClassName("dropdown-content-show"), (item) => {
               item.classList.remove('dropdown-content-show');
            });

            toggleMenuLights(false);
            adjustSearchBar(dropdown, searchBar.getBoundingClientRect());
            dropdown.style.display = 'block';
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target !== searchBar || event.target !== dropdown) {
            dropdown.style.display = 'none';
        }
    });
}

function adjustSearchBar(dropdown, rect) {
    dropdown.style.left = rect.left + 'px';
    dropdown.style.top = (rect.bottom - 1) + 'px';
    dropdown.style.width = (rect.right - rect.left - 1) + 'px';
}

window.onload = () => {
    initDropdown(document.getElementById('department-dropdown'), document.getElementById("menu-department"));
    initDropdown(document.getElementById('favourites-dropdown'), document.getElementById("menu-favourites"));
    initSearchBar();
};