let recipeHTML = '';

document.querySelector('.js-search').addEventListener('click', async() => {
  
  const searchInput = document.querySelector('.js-input').value;
  document.querySelector('.js-search-result').classList.remove('hidden');
  document.querySelector('.js-search-result').innerHTML = `Searching for "${searchInput}"...`;


  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const SEARCH_URL = `${BASE_URL}search.php?s=`;
  const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

  const response = await fetch(`${SEARCH_URL}${searchInput}`);
  const data = await response.json();
  console.log(data);

  document.querySelector('.js-search-result').innerHTML = `Search results for "${searchInput}"`;

  data.meals.forEach((meal) => {
    recipeHTML += `
      <div class="recipe">
        <img src="${meal.strMealThumb}">
        <div>${meal.strMeal}</div>
      </div>
    `;
  });

  document.querySelector('.js-recipe-container').innerHTML = recipeHTML;
});