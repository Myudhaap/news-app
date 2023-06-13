const apiKey =  "654153925c2148b18a8c271e8dece38a";
const categorys = [
  'General',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
  'Technology'
]
const country = 'id';
const wrapperCategory = document.querySelector('.wrapper-category');
const wrapperContent = document.querySelector('.content-wrapper');

// URL Api
let urlApi ;

const selectCategory = (e, category) => {
  const btnCategorys = document.querySelectorAll('.category-btn');
  btnCategorys.forEach(data => {
    data.classList.remove('active');
  })
  urlApi = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add('active');
  getNews();
}


const getOptions = () => {
  for(let category of categorys){
    wrapperCategory.innerHTML += `
    <button class="category-btn ${category === 'General' ? 'active' : ''}" onclick = "selectCategory(event, '${category}')">${category}</button>
    `;
  }
}

const generatedUi = (articles) => {
  wrapperContent.innerHTML = '';
  for(let data of articles){
    const card = document.createElement('div');
    card.classList.add('card-news');
    card.innerHTML = `
    <div class="news-img">
      <img src="${data.urlToImage || 'https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'}" alt="News Image">
    </div>
    <div class="card-body">
      <p class="news-title">${data.title}</p>
      <p class="news-text">${data.description || data.content || ""}</p>
      <a href="${data.url}" target="_blank" class="news-btn">Read More</a>
    </div>
    `;
    wrapperContent.appendChild(card);
  }
  // articles.forEach((data) => {
  //   console.log(data)
  // })
}

const getNews = async () => {
  const response = await fetch(urlApi);
  if(!response.ok){
    alert('Data Unvaliable, try again later!');
    return false;
  }
  const data = await response.json();
  console.log(data.articles)
  generatedUi(data.articles);
}

const init = () => {
  getOptions();
  getNews();
}

window.onload = () => {
  urlApi = `https://newsapi.org/v2/top-headlines?country=${country}&category=${categorys[0]}&apiKey=${apiKey}`;
  init();
}