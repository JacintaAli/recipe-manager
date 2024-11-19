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
