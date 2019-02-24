function toggleMenuLights(lightsOn) {
    document.getElementById('menu-dimmer').classList.toggle('on', lightsOn);
}

function initDropdown(dropdown, menuItem) {
    let searchBar = document.getElementById('search-dropdown');

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
    let typingTimeout;
    let searchButton = document.getElementById('search-button');
    let searchBar = document.getElementById('search-bar');
    let dropdown = document.getElementById('search-dropdown');
    let currentString = '';

    window.onresize = () => adjustSearchBar(dropdown, searchBar.getBoundingClientRect());

    searchButton.addEventListener('click', () => location.href = "search.html");

    searchBar.addEventListener('input', () => {
        if (dropdown.style.display === 'none') {
            Array.prototype.forEach.call(document.getElementsByClassName("dropdown-content-show"), (item) => {
                item.classList.remove('dropdown-content-show');
            });
        }
    });

    searchBar.addEventListener('keyup', () => {
        clearTimeout(typingTimeout);

        typingTimeout = window.setTimeout(() => {
            if (searchBar.value === currentString || searchBar.value === '') {
                return;
            }

            currentString = searchBar.value;

            let request = new XMLHttpRequest();
            request.open('GET', 'https://search.api.tesco.com/suggestion/?distchannel=ghs&limit=10&query=' + searchBar.value, true);

            request.onreadystatechange = () => {

                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.response);
                    let results = data['results'];

                    if (results.length === 0) {
                        dropdown.style.display = 'none';
                        currentString = '';
                        return;
                    }

                    let searchItems = document.getElementById('search-items');

                    while (searchItems.firstChild) {
                        searchItems.removeChild(searchItems.firstChild);
                    }

                    results.forEach(result => {
                        let link = document.createElement('a');

                        let linkText = document.createTextNode(result['query']);

                        link.href = '#' + result['query'];
                        link.classList.add('dropdown-item');
                        link.appendChild(linkText);

                        searchItems.appendChild(link);
                    });

                    adjustSearchBar(dropdown, searchBar.getBoundingClientRect());
                    dropdown.style.display = 'block';
                } else {
                    dropdown.style.display = 'none';
                    currentString = '';
                }
            };
            request.send();

        }, 500);
    });

    document.addEventListener('click', (event) => {
        if (event.target !== searchBar || event.target !== dropdown) {
            dropdown.style.display = 'none';
            currentString = '';
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

    Array.prototype.forEach.call(document.getElementsByClassName("dropdown"), (item) => {
        let dropdownButton = item.getElementsByClassName('button-dropdown')[0];
        let dropdownMenu = item.getElementsByClassName('dropdown-menu')[0];

        dropdownButton.addEventListener('click', () => {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                dropdownButton.classList.remove('selected');
            } else {
                dropdownMenu.style.display = 'block';
                dropdownButton.classList.add('selected');
            }
        });

        document.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
                dropdownButton.classList.remove('selected');
            }
        });
    });

};