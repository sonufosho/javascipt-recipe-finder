const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

async function renderRecipeDetailsHTML() {
  const response = await fetch(`${LOOKUP_URL}${localStorage.getItem('idMeal')}`);
  const data = await response.json();
  console.log(data);

  const meal = data.meals[0];

  let ingredientHTML = '';

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredientHTML += `
        <p><i class="green ri-checkbox-circle-fill"></i> ${measure ? measure : ''} ${ingredient}</p>
      `;
    }
  }

  recipeDetailsHTML = `
    <div class="meal-info">
        <img src="${meal.strMealThumb}">
        <p class="recipe-name">${meal.strMeal}</p>
      </div>

      <div class="details">
          <details>
            <summary>Instructions</summary>
            <p>${meal.strInstructions}</p>
          </details>
          <details>
            <summary>Ingredients</summary>
            ${ingredientHTML}
          </details>
      </div>
      <div class="yt">
        <a href="${meal.strYoutube}">
        <button class="yt-button"><i class="ri-youtube-fill"></i> Watch Video</button>
        </a>
      </div>
  `;
  
  document.querySelector('.js-container').innerHTML = recipeDetailsHTML;
}

renderRecipeDetailsHTML();

document.querySelector('.js-back-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});