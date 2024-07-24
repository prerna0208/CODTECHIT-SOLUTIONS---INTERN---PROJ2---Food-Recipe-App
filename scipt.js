const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (dish) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try{
        const dataItem = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
    const response = await dataItem.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
           <img src = "${meal.strMealThumb}">
           <h2>${meal.strMeal}</h2>
           <p><span>${meal.strArea}</span> Dish</p>
           <p>This dish belongs to <span>${meal.strCategory}</span> category.</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe!";
        recipeDiv.appendChild(button);

        //adding event listener to recipe button
        button.addEventListener('click', () => {
            openRecipes(meal);
        });
         
        recipeContainer.appendChild(recipeDiv);
    });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching recipes!</h2>";
    }
    
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipes = (meal) => {
    recipeDetailsContent.innerHTML = `
       <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredients:</h3>
       <ul class="IngredientList">${fetchIngredients(meal)}</ul>
       <div class="recipeInstructions">
           <h3>Instructions:</h3>
           <p>${meal.strInstructions}</p>
        </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchbtn.addEventListener('click',(e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Please enter the dish name first</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

// rgb(155, 183, 193);
//rgb(2, 48, 56);
//#f44336;