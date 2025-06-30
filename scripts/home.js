const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

let recipeHTML = '';

document.querySelector('.js-search').addEventListener('click', async() => {
  const searchInput = document.querySelector('.js-input').value;

  document.querySelector('.js-search-result').classList.remove('hidden');
  document.querySelector('.js-search-result').innerHTML = `Searching for "${searchInput}"...`;

  const response = await fetch(`${SEARCH_URL}${searchInput}`);
  const data = await response.json();
  console.log(data);

  document.querySelector('.js-search-result').innerHTML = `Search results for "${searchInput}"`;

  data.meals.forEach((meal) => {
    recipeHTML += `
      <div class="recipe js-recipe" data-id-meal="${meal.idMeal}">
        <img src="${meal.strMealThumb}">
        <div>${meal.strMeal}</div>
      </div>
    `;
  });

  localStorage.setItem('searchInput', searchInput);
  localStorage.setItem('recipeHTML', recipeHTML);

  document.querySelector('.js-recipe-container').innerHTML = recipeHTML;

  document.querySelectorAll('.js-recipe').forEach((recipe) => {
    recipe.addEventListener('click', () => {
      const idMeal = recipe.dataset.idMeal;
      localStorage.setItem('idMeal', idMeal);
      window.location.href = 'recipe.html';
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const storedHTML = localStorage.getItem('recipeHTML');

  if (storedHTML) {
    document.querySelector('.js-search-result').classList.remove('hidden');
    document.querySelector('.js-search-result').innerHTML = `Search results for "${localStorage.getItem('searchInput')}"`;

    document.querySelector('.js-recipe-container').innerHTML = storedHTML;

    document.querySelectorAll('.js-recipe').forEach((recipe) => {
      recipe.addEventListener('click', () => {
        const idMeal = recipe.dataset.idMeal;
        localStorage.setItem('idMeal', idMeal);
        window.location.href = 'recipe.html';
      });
    });
  }
});