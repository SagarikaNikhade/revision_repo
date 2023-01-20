// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://127.0.0.1:${ import.meta && import.meta.env && import.meta.env.REACT_APP_JSON_SERVER_PORT ? import.meta.env.REACT_APP_JSON_SERVER_PORT : 9090 }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //

let mainSection = document.getElementById("data-list-wrapper");

let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

let fetchRecipesBtn = document.getElementById('fetch-recipes');
let fetchEmployeesBtn = document.getElementById('fetch-employees');

let filterLessThan50Btn = document.getElementById("filter-less-than-50");
let filterMoreThanEqual50Btn = document.getElementById("filter-more-than-equal-50");

window.addEventListener("load",()=>{
    fetchAndRenderCats()
});

// CATS
let catsData = [];

function fetchAndRenderCats(){
    fetch(`${baseServerURL}/cats`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data);

        let obj= data.map(item =>({
            name :item.name,
            description:  item.description.substring(0,75),
            cost:item.cost,
            image :`${baseServerURL}${item.image}`
        }))
        catsData = obj;
        renderCardList(catsData);
    })
}


function renderCardList(anything) {

    let cardList = `
      <div class="card-list">
        ${anything.map(item =>
      getCard(item.name, item.description, item.cost,item.image)
    ).join(" ")}
      </div>  
      `

    mainSection.innerHTML = cardList;
  }

  function getCard(name,description, cost,image) {
    let card = `
  <div class="card">
    <div class="card-image">
      <img src=${image} alt="food"/>
    </div>
    <div class="card-body">
      <h3 class="card-item card-title">${name}</h3>
    </div>
    <div class="card-item card-description">
    ${description}
    </div>
    <div class="card-item card-additional-info">
      ${cost}
    </div>
  </div>
  `

    return card;
  }


//   SORTING
sortAtoZBtn.addEventListener("click",()=>{
    // console.log(catsData)
    catsData.sort((a,b)=>{
        return a.cost - b.cost
    })
    // console.log(catsData);
    renderCardList(catsData);
});

sortZtoABtn.addEventListener("click",()=>{
    // console.log(catsData)
    catsData.sort((a,b)=>{
        return b.cost - a.cost
    })
    // console.log(catsData);
    renderCardList(catsData);
});


// FILTER
filterLessThan50Btn.addEventListener("click",()=>{
    let cat=[];
    for(let i=0;i<catsData.length;i++){
        if(catsData[i].cost < 50){
           cat.push(catsData[i]);
        }
    }
    renderCardList(cat);
});

filterMoreThanEqual50Btn.addEventListener("click",()=>{
    let cat1=[];
    for(let i=0;i<catsData.length;i++){
        if(catsData[i].cost >= 50){
           cat1.push(catsData[i]);
        }
    }
    renderCardList(cat1);
});

// RECIPE
fetchRecipesBtn.addEventListener("click",()=>{
    fetch(`${baseServerURL}/recipes`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
         console.log(data);

         let recipeObj = data.map(item => ({
            name : item.name,
            price : "Rs. "+ item.price,
            image : `${baseServerURL}${item.image}` 
       }))
       renderCardListRecipe(recipeObj)
    })
});

function renderCardListRecipe(anything) {

    let cardList = `
      <div class="card-list">
        ${anything.map(item =>
            getCardRecipe(item.name, item.price,item.image)
    ).join(" ")}
      </div>  
      `

    mainSection.innerHTML = cardList;
  }

  function getCardRecipe(name,price,image) {
    let card = `
    <div class="card">
    <div class="card-image">
      <img src=${image} alt="food"/>
    </div>
    <div class="card-body">
      <h3 class="card-item card-title">${name}</h3>
    </div>
    <div class="card-item card-description">
    ${price}
    </div>
  </div>
  `

    return card;
  }


//    Employee
fetchEmployeesBtn.addEventListener("click",()=>{
    fetch(`${baseServerURL}/employees`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
         console.log(data);

         let employeeObj = data.map(item => ({
            name : item.name,
            salary : "Rs. "+ item.salary,
            image : `${baseServerURL}${item.image}`,
            linkText:"Greet" 
       }))
       renderCardListEmployee(employeeObj)
    })
});

function renderCardListEmployee(anything) {

    let cardList = `
      <div class="card-list">
        ${anything.map(item =>
            getCardEmployee(item.name, item.salary,item.image,item.linkText)
    ).join(" ")}
      </div>  
      `

    mainSection.innerHTML = cardList;
  }

  function getCardEmployee(name,salary,image,linkText) {
    let card = `
    <div class="card">
    <div class="card-image">
      <img src=${image} alt="food"/>
    </div>
    <div class="card-body">
      <h3 class="card-item card-title">${name}</h3>
      <div class="card-item card-description">${salary}</div>
      <a href="#" class="card-item card-link">${linkText}</a>
    </div>
  </div>
  `

    return card;
  }