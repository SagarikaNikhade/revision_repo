// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------


const recipeIngredientURL = `${baseServerURL}/recipeIngredients`;
const employeeURL = `${baseServerURL}/employees`;
const userRegisterURL = `${baseServerURL}/register`;
const userLoginURL = `${baseServerURL}/login`;

// getTodo
let getTodoButton = document.getElementById("fetch-todos");

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let userAuthToken = localStorage.getItem("localAccessToken") || null;
let userId = +localStorage.getItem("userId") || null;
const urlAllTodosOfUser = `${baseServerURL}/todos?userId=${userId}`;
const urlTodosBase = `${baseServerURL}/todos/`;

let empNameInput = document.getElementById("employee-name");
let empImgInput = document.getElementById("employee-image");
let empDeptInput = document.getElementById("employee-dept");
let empSalaryInput = document.getElementById("employee-salary");
let empCreateBtn = document.getElementById("add-employee");
// Sorting
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let catsData = [];
let foodData = [];
let empData = [];


// Start code from here

// Event Listener
window.addEventListener("load",()=>{
  // fetchAndRenderCats();
  // fetchAndRenderIngredients()
  fetchAndRenderEmployee()
});

let catsBtn = document.querySelector("#fetch-cats");
catsBtn.addEventListener("click",()=>{
  fetchAndRenderCats();
})

// 2. Rendering
function renderCardList(cardData) {

  let cardList = `
  <div class="card-list">
  ${cardData.map(item => 
    getCard(item.title, item.description, item.linkText, item.linkUrl, item.imageUrl,item.salary)).join(' ')
  }
  </div>
`
  mainSection.innerHTML = cardList;

}

function getCard(title,desc,linkText,linkUrl,imageUrl,salary){
  let card=`
  <div class="card">
  <div class="card_img">
  <img src=${imageUrl} alt="food"/>
  </div>
  <div class="card_body">
  <h3 class="card_item card_title">${title}</h3>
  <h3 class="card_item card_title">${salary}</h3>
  <div class="card_item card_description">${desc}</div>
  <a href=${linkUrl} class="card_item card_link">${linkText}</a>
  </div>
  </div>
  `

  return card;
}

// 3.Fetch
function fetchAndRenderCats(){
  fetch(`${baseServerURL}/cats`)
   .then((res)=>{
    return res.json()
   })
   .then((data)=>{
    console.log(data)

    let catsObj = data.map(cat => ({
      title : cat.name,
      description : cat.description.substring(0,100),
      linkText : "Read more",
      linkUrl : 'https://google.com',
      imageUrl:`${baseServerURL}${cat.image}`
    }))
    
    catsData =catsObj;
    renderCardList(catsObj)

   })
}

function fetchAndRenderIngredients(){
  fetch(recipeIngredientURL)
   .then((res)=>{
    return res.json()
   })
   .then((data)=>{
    console.log(data)

    let foodObj = data.map(item => ({
      title : item.name,
      description : item.description,
      linkText : "Read more",
      linkUrl : 'https://google.com',
      imageUrl:`${baseServerURL}${item.image}`
    }))
    
    foodData =foodObj;
    renderCardList(foodObj)

   })
}


// Add Employee
empCreateBtn.addEventListener("click",()=>{
  let name = empNameInput.value;
  let image = empImgInput.value;
  let department = empDeptInput.value;
  let salary = empSalaryInput.value;

  let empObj = {
    name,image,department,salary
  }

  addEmployee(empObj)
  fetchAndRenderEmployee()
})

function addEmployee(userObj){
  fetch(employeeURL,{
    method : 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userObj)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data);
   })
}

function fetchAndRenderEmployee(){
  fetch(employeeURL)
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data);

    let empObj = data.map(el=>({
      title : el.name,
      imageUrl:`${baseServerURL}${el.image}`,
      description : el.department,
      salary : el.salary,
      linkText : "Read more",
      linkUrl : 'https://google.com',
    }))
   empData = empObj
   renderCardList(empData)
  })
}

// Update all field of Employee

let updateEmpIdInput = document.getElementById("update-employee-id");
let updateEmpNameInput = document.getElementById("update-employee-name");
let updateEmpImageInput = document.getElementById("update-employee-image");
let updateEmpDeptInput = document.getElementById("update-employee-dept");
let updateEmpSalaryInput = document.getElementById("update-employee-salary");
let updateEmpUpdateBtn = document.getElementById("update-employee");

let updateScoreEmpId = document.getElementById("update-score-employee-id");

let updateScoreEmpSalary = document.getElementById(
  "update-score-employee-salary"
);
let updateScoreEmpSalaryButton = document.getElementById(
  "update-score-employee"
);

let employeesData = [];

// function updateEmployee(){
//   fetch(employeeURL,{
//     method : 'PATCH',

//   })
// }


// Sort by Salary

sortAtoZBtn.addEventListener("click",()=>{
  if(empData && empData.length){
    empData.sort((a,b)=>{
      return a.salary-b.salary;
    })
    console.log(empData)
    renderCardList(empData)
  }else{
    alert("Something wrong!!")
  }
})


sortZtoABtn.addEventListener("click",()=>{
  if(empData && empData.length){
    empData.sort((a,b)=>{
      return b.salary-a.salary;
    })
    console.log(empData)
    renderCardList(empData)
  }else{
    alert("Something wrong!!")
  }
})

// Filtering

let filterLessThan1L = document.querySelector("#filter-less-than-1L");
filterLessThan1L.addEventListener("click",()=>{
  if(empData && empData.length){
    let lessempData = empData.filter(el=>
      el.salary < 100000
    )
    console.log(lessempData)
    renderCardList(lessempData)
  }
})

let filterMoreThanEqual1L = document.querySelector("#filter-more-than-equal-1L");
filterMoreThanEqual1L.addEventListener("click",()=>{
  if(empData && empData.length){
    let moreempData = empData.filter(el=>
      el.salary >= 100000
    )
    console.log(moreempData)
    renderCardList(moreempData)
  }
})


// Register the User

let registerUserUsername = document.getElementById("register-user-username");
let registerUserFirstname = document.getElementById("register-user-firstname");
let registerUserLastname = document.getElementById("register-user-lastname");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassowrd = document.getElementById("register-user-passowrd");
let registerUserAvatar = document.getElementById("register-user-avatar");
let registerUserLevel = document.getElementById("register-user-level");
let registerUserButton = document.getElementById("register-user");

registerUserButton.addEventListener("click",()=>{
  let username = registerUserUsername.value;
  let firstname = registerUserFirstname.value;
  let lastname = registerUserLastname.value;
  let email = registerUserEmail.value;
  let password = registerUserPassowrd.value;
  let avatar = registerUserAvatar.value;
  let userLevel = registerUserLevel.value;

  let userObj ={
    username,firstname,lastname,email,password,avatar,userLevel
  }
  registerUser(userObj)
})

function registerUser(userObj){
  fetch(userRegisterURL,{
    method : 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userObj)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data);
   })
}


// login
let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");
let loginUserButton = document.getElementById("login-user");

loginUserButton.addEventListener("click",async()=>{
  let username = loginUserUsername.value;
  let password = loginUserPassword.value;
  let userObj = {
    username,password
  };

     loginUser(userObj)
     
    let data = await res.json();
    console.log("login ", data);
    localStorage.setItem("localAccessToken", data.accessToken);
    localStorage.setItem("userId", data.user.id)
    alert("user successfully logged in.");
  
})

function loginUser(userObj){
  fetch(userLoginURL,{
    method : 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userObj)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data);
   })
}