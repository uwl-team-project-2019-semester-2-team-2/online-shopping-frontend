function displayDropdown(open, dropdown) {
    if (open) {
        dropdown.classList.add('dropdown-content-show');
    } else {
        dropdown.classList.remove('dropdown-content-show');
    }
}

function toggleLights(lightsOn) {
    let dimmer = document.getElementById('dimmer');
    dimmer.style.display = lightsOn ? "block" : "none";
}

function initDropdown(dropdown) {
    let isMouseOverMenu = false;
    let isMouseOverDropDown = false;
    let timeoutId;

    dropdown['menu_item'].addEventListener("click", function(event) {
        isMouseOverMenu = true;

        toggleLights(!dropdown['dropdown'].classList.contains("dropdown-content-show"));
        displayDropdown(!dropdown['dropdown'].classList.contains("dropdown-content-show"), dropdown['dropdown']);

        timeoutId = null;
    });

    dropdown['menu_item'].addEventListener("mouseenter", function(event) {
        isMouseOverMenu = true;

        if (document.getElementsByClassName("dropdown-content-show").length > 0) {
            displayDropdown(true, dropdown['dropdown']);
            toggleLights(true);
        } else {

            timeoutId = window.setTimeout(function () {
                toggleLights(true);
                displayDropdown(true, dropdown['dropdown']);
            }, 800);
        }
    });

    dropdown['menu_item'].addEventListener("mouseleave", function(event) {
        isMouseOverMenu = false;

        timeoutId = window.setTimeout(function () {
            if (!isMouseOverDropDown) {
                toggleLights(false);
                displayDropdown(false, dropdown['dropdown']);
            }
        }, 50);

    });

    dropdown['dropdown'].addEventListener("mouseenter", function(event) {
        isMouseOverDropDown = true;
    });

    dropdown['dropdown'].addEventListener("mouseleave", function(event) {
        isMouseOverDropDown = false;

        timeoutId = window.setTimeout(function () {
            if (!isMouseOverMenu) {
                displayDropdown(false, dropdown['dropdown']);

                if (!document.getElementsByClassName("dropdown-content-show").length > 0) {
                    toggleLights(false);
                }
            }
        }, 50);
    });
}

window.onload = function(){
    let departments = {
        'menu_item': document.getElementById("menu-department"),
        'dropdown': document.getElementById('department-dropdown'),
        isMouseOverMenu: false,
        isMouseOverDropDown: false
    };

    let favourites = {
        'menu_item': document.getElementById("menu-favourites"),
        'dropdown': document.getElementById('favourites-dropdown'),
        isMouseOverMenu: false,
        isMouseOverDropDown: false
    };

    initDropdown(departments);
    initDropdown(favourites);
};
