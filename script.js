document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipe-form");
    const recipeNameInput = document.getElementById("recipe-name");
    const recipeIngredientsInput = document.getElementById("recipe-ingredients");
    const recipeStepsInput = document.getElementById("recipe-steps");
    const recipeList = document.getElementById("recipes");

    // Load recipes from local storage
    const loadRecipes = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.forEach((recipe) => addRecipeToDOM(recipe));
    };

    // Save recipe to local storage
    const saveRecipe = (recipe) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    };

    // Add recipe to the DOM
    const addRecipeToDOM = (recipe) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            deleteRecipe(recipe.name);
        });
        recipeList.appendChild(li);
    };

    // Delete recipe from local storage
    const deleteRecipe = (recipeName) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    };

    // Handle form submission
    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const recipe = {
            name: recipeNameInput.value.trim(),
            ingredients: recipeIngredientsInput.value.split(",").map((item) => item.trim()),
            steps: recipeStepsInput.value.trim(),
        };

        if (recipe.name && recipe.ingredients.length && recipe.steps) {
            addRecipeToDOM(recipe);
            saveRecipe(recipe);
            recipeForm.reset();
        } else {
            alert("Please fill out all fields.");
        }
    });

    // Initialize the app
    loadRecipes();
});

document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipe-form");
    const recipeNameInput = document.getElementById("recipe-name");
    const recipeCategorySelect = document.getElementById("recipe-category");
    const recipeIngredientsInput = document.getElementById("recipe-ingredients");
    const recipeStepsInput = document.getElementById("recipe-steps");
    const recipeCategories = document.getElementById("categories");

    // Load recipes from local storage
    const loadRecipes = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const groupedRecipes = groupRecipesByCategory(recipes);

        // Render categories and recipes
        for (const [category, recipes] of Object.entries(groupedRecipes)) {
            addCategoryToDOM(category, recipes);
        }
    };

    // Save recipe to local storage
    const saveRecipe = (recipe) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    };

    // Group recipes by category
    const groupRecipesByCategory = (recipes) => {
        return recipes.reduce((acc, recipe) => {
            if (!acc[recipe.category]) acc[recipe.category] = [];
            acc[recipe.category].push(recipe);
            return acc;
        }, {});
    };

    // Add category and its recipes to the DOM
    const addCategoryToDOM = (category, recipes = []) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        const recipeList = document.createElement("ul");

        recipes.forEach((recipe) => {
            const recipeItem = createRecipeDOMElement(recipe);
            recipeList.appendChild(recipeItem);
        });

        categoryDiv.appendChild(recipeList);
        recipeCategories.appendChild(categoryDiv);
    };

    // Create a recipe DOM element
    const createRecipeDOMElement = (recipe) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h4>${recipe.name}</h4>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            deleteRecipe(recipe.name);
        });
        return li;
    };

    // Delete recipe from local storage
    const deleteRecipe = (recipeName) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    };

    // Handle form submission
    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const recipe = {
            name: recipeNameInput.value.trim(),
            category: recipeCategorySelect.value,
            ingredients: recipeIngredientsInput.value.split(",").map((item) => item.trim()),
            steps: recipeStepsInput.value.trim(),
        };

        if (recipe.name && recipe.category && recipe.ingredients.length && recipe.steps) {
            // Add recipe to its category in the DOM
            let categoryDiv = document.querySelector(`.category h3:contains("${recipe.category}")`);

            if (!categoryDiv) {
                addCategoryToDOM(recipe.category, [recipe]);
            } else {
                const recipeList = categoryDiv.nextElementSibling;
                recipeList.appendChild(createRecipeDOMElement(recipe));
            }

            saveRecipe(recipe);
            recipeForm.reset();
        } else {
            alert("Please fill out all fields.");
        }
    });

    // Initialize the app
    loadRecipes();
});
