
const heroContainer = document.getElementById("heroContainer");
const heroCount = document.getElementById("heroCount");

const searchInput = document.getElementById("searchInput");
const generationFilter = document.getElementById("generationFilter");
const rarityFilter = document.getElementById("rarityFilter");
const troopFilter = document.getElementById("troopFilter");
const clearFiltersButton = document.getElementById("clearFilters");
const sortFilter = document.getElementById("sortFilter");

const heroModal = document.getElementById("heroModal");
const heroDetails = document.getElementById("heroDetails");
const closeModal = document.getElementById("closeModal");

let heroes = [];

// Load heroes from JSON
async function loadHeroes() {
    try {
        const response = await fetch("heroes.json");

        if (!response.ok) {
            throw new Error("Failed to load hero data.");
        }

        const data = await response.json();
        console.log("JSON DATA:", data);
        console.log("HEROES:", data.heroes);

        heroes = data.heroes;

        loadFilters();
        displayHeroes(heroes);

    } catch (error) {
        console.error(error);
        heroCount.textContent = "Unable to load heroes.";
        heroContainer.innerHTML =
            '<p class="message">Please check your JSON file and connection.</p>';
    }
}

// Get a readable value from API objects or strings
function getValue(value) {
    if (value && typeof value === "object") {
        return value.name || value.value || "";
    }

    return value || "";
}

// Load filter options
function loadFilters() {
    const generations = [];
    const rarities = [];
    const troops = [];

    heroes.forEach(function(hero) {
        const generation = String(getValue(hero.generation));
        const rarity = getValue(hero.rarity);
        const troop = getValue(hero.troopType);

        if (generation && !generations.includes(generation)) {
            generations.push(generation);
        }

        if (rarity && !rarities.includes(rarity)) {
            rarities.push(rarity);
        }

        if (troop && !troops.includes(troop)) {
            troops.push(troop);
        }
    });

    generations.sort();
    rarities.sort();
    troops.sort();

    generations.forEach(function(generation) {
        generationFilter.innerHTML +=
            `<option value="${generation}">${generation}</option>`;
    });

    rarities.forEach(function(rarity) {
        rarityFilter.innerHTML +=
            `<option value="${rarity}">${rarity}</option>`;
    });

    troops.forEach(function(troop) {
        troopFilter.innerHTML +=
            `<option value="${troop}">${troop}</option>`;
    });
}

// Display hero cards
function displayHeroes(heroList) {
    heroContainer.innerHTML = "";

    heroCount.textContent =
        `Showing ${heroList.length} of ${heroes.length} heroes`;

    if (heroList.length === 0) {
        heroContainer.innerHTML =
            '<p class="message">No heroes found.</p>';
        return;
    }

    heroList.forEach(function(hero) {
        const name = hero.name || "Unknown Hero";
        const generation = getValue(hero.generation);
        const rarity = getValue(hero.rarity);
        const troop = getValue(hero.troopType);

        const card = document.createElement("div");
        card.className = "hero-card";

        const image = document.createElement("img");
        image.className = "hero-image";
        image.src = `https://assets.kingshotcommand.com/${hero.image}`;
        image.alt = name;

        image.onerror = function() {
            image.style.display = "none";
        };

        const title = document.createElement("h3");
        title.textContent = name;

        // GENERATION BADGE
        const generationBadge = document.createElement("span");
        generationBadge.className = "generation-badge";
        generationBadge.textContent = "GEN " + generation;

        // RARITY BADGE
        const rarityBadge = document.createElement("span");
        rarityBadge.className =
            "rarity-badge rarity-" + rarity.toLowerCase();
        rarityBadge.textContent = rarity;

        // TROOP TYPE BADGE
        const troopBadge = document.createElement("span");
        troopBadge.className =
            "troop-badge troop-" + troop.toLowerCase();
        troopBadge.textContent = troop;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(generationBadge);
        card.appendChild(rarityBadge);
        card.appendChild(troopBadge);

        // Open hero details when card is clicked
        card.addEventListener("click", function() {
            showHeroDetails(hero);
        });

        heroContainer.appendChild(card);
    });
}

// Display skill information
function displaySkills(skills) {
    if (!Array.isArray(skills) || skills.length === 0) {
        return "<p>No skills available.</p>";
    }

    return skills.map(function(skill) {
        const skillImage = skill.image
            ? `https://assets.kingshotcommand.com/${skill.image}`
            : "";

        const levels = skill.gameSkill?.levels || [];

        return `
            <div class="skill-card">

                ${skillImage ? `
                    <img src="${skillImage}" alt="${skill.name}"
                         class="skill-image">
                ` : ""}

                <h4>${skill.name || "Unnamed Skill"}</h4>

                <p>${skill.description || "No description available."}</p>

                <div class="skill-levels">
                    <h4>Skill Levels</h4>

                    ${levels.length > 0
                        ? levels.map(function(level) {
                            return `
                                <p>
                                    <strong>Level ${level.level}:</strong>
                                    ${level.description}
                                </p>
                            `;
                        }).join("")
                        : "<p>No level information available.</p>"
                    }
                </div>

            </div>
        `;
    }).join("");
}

// Display hero details
function showHeroDetails(hero) {
    const name = hero.name || "Unknown Hero";
    const generation = getValue(hero.generation);
    const rarity = hero.rarity?.label || getValue(hero.rarity);
    const troop = hero.troopType?.label || getValue(hero.troopType);

    const image = `https://assets.kingshotcommand.com/${hero.image}`;

    heroDetails.innerHTML = `
        <img src="${image}" alt="${name}">

        <h2>${name}</h2>

        <div class="hero-info">
            <span>Generation ${generation}</span>
            <span>${rarity}</span>
            <span>${troop}</span>
        </div>

        <h3>Description</h3>
        <p>${hero.description || "No description available."}</p>

        <h3>Conquest Skills</h3>
        ${displaySkills(hero.conquestSkills)}

        <h3>Expedition Skills</h3>
        ${displaySkills(hero.expeditionSkills)}
    `;

    heroModal.style.display = "flex";
}

// Close modal
closeModal.addEventListener("click", function() {
    heroModal.style.display = "none";
});

// Close modal when clicking outside
heroModal.addEventListener("click", function(event) {
    if (event.target === heroModal) {
        heroModal.style.display = "none";
    }
});

// Close modal using Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        heroModal.style.display = "none";
    }
});

// Search, filter, and sort heroes
function filterHeroes() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedGeneration = generationFilter.value;
    const selectedRarity = rarityFilter.value;
    const selectedTroop = troopFilter.value;
    const selectedSort = sortFilter.value;

    const filteredHeroes = heroes.filter(function(hero) {
        const name = (hero.name || "").toLowerCase();
        const generation = String(getValue(hero.generation));
        const rarity = getValue(hero.rarity);
        const troop = getValue(hero.troopType);

        return (
            name.includes(searchValue) &&
            (!selectedGeneration || generation === selectedGeneration) &&
            (!selectedRarity || rarity === selectedRarity) &&
            (!selectedTroop || troop === selectedTroop)
        );
    });

    // SORT HEROES
    if (selectedSort === "name-asc") {
        filteredHeroes.sort(function(a, b) {
            return (a.name || "").localeCompare(b.name || "");
        });

    } else if (selectedSort === "name-desc") {
        filteredHeroes.sort(function(a, b) {
            return (b.name || "").localeCompare(a.name || "");
        });

    } else if (selectedSort === "generation-asc") {
        filteredHeroes.sort(function(a, b) {
            return Number(getValue(a.generation)) -
                   Number(getValue(b.generation));
        });

    } else if (selectedSort === "generation-desc") {
        filteredHeroes.sort(function(a, b) {
            return Number(getValue(b.generation)) -
                   Number(getValue(a.generation));
        });
    }

    displayHeroes(filteredHeroes);
}

// Clear all search and filters
function clearFilters() {
    searchInput.value = "";
    generationFilter.value = "";
    rarityFilter.value = "";
    troopFilter.value = "";
    sortFilter.value = "default";

    displayHeroes(heroes);
}

// Listen for user input
searchInput.addEventListener("input", filterHeroes);
generationFilter.addEventListener("change", filterHeroes);
rarityFilter.addEventListener("change", filterHeroes);
troopFilter.addEventListener("change", filterHeroes);
sortFilter.addEventListener("change", filterHeroes);

clearFiltersButton.addEventListener("click", clearFilters);

// Start loading heroes
loadHeroes();
