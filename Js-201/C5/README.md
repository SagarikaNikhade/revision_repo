# JS-VITE-WITH-MOCK-SERVER

Please do NOT use VSCode live-server. It will not work. Use the npm commands suggested to you here.

## Installation
```
npm i
```

## Start only Backend server
```
npm run server
```

## Start only Frontend server
```
npm run start
```

## Start both BE & FE in a single command
```
npm run watch
```

# Important files
```
.
├── index.html
├── scripts
│   └── main.js
└── styles
    └── style.css
```

## Maximum Marks - 10

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

## Rubrics

```
✅ able to submit the app - 1 mark ( minimum score )
✅ Able to login & display recipes - 3 mark
✅ Able to sort recipes - 1 mark
✅ Able to filter recipes - 1 mark
✅ Able to populate edit inputs  - 2 mark
✅ Able to edit the price  - 2 mark
```
### You haven't been taught cypress to run the test cases locally, you can see the passed/ failed test cases and test errors on CP itself.

## Some Rules to follow:-

- Before writing a single line of code please read the problem statement very carefully.
- Don't change the already given ids or classes.
- If you don't follow these rules you might not get any marks even if you do everything correctly.

# Problem statements

### 0. Initial state
Initially the frontend would look something like this: 

![picture 1](https://res.cloudinary.com/drxuo575c/image/upload/v1674107255/coding-problems/2e6e0bc5bc07a7db5b0ffc0d01158d17441fd0b073bbc9aaee44d3f6cb070a06.jpg)  

- At the top right, the website says Welcome, anonymous!
- The `#data-list-wrapper` is empty


### 1. Able to login [0]

If a user enters their correct username / password and click the `button#login-user`, the following should happen:
- make a fetch request to log in. You need to make a request to `${baseServerURL}/login`. The `body` that you send with the request should contain `username` and the `password` keys.
- if the fetch request is successful, you will get back accessToken & user information from the server.
![picture 3](https://res.cloudinary.com/drxuo575c/image/upload/v1674108082/coding-problems/f8c18e707b0f076a2a9d2d6216b6a0d825e714bbe132b1c9958db5c8b5bddfe2.jpg)  
- Display the `username` in `span#welcome-username` at the top right of the screen. You are expected to use the `username` key in the `user` object that you get from the server. Do not hardcode `admin`.

- Store the accessToken & user information in variables `userAuthToken & userInfo`

A user with username & password `admin` has already been created for you. Once the user logs in the screen should look something like this: 
![picture 4](https://res.cloudinary.com/drxuo575c/image/upload/v1674108389/coding-problems/b4687c2aa7ca4c6abe3122830e1f3a80503ab873e837ab6c7ceee02e1bec518c.jpg)  


### 2. Able to fetch & display recipes after logging in [3]

On the click of `#fetch-recipes` button, a list of recipes should be shown in the `#data-list-wrapper`

![picture 5](https://res.cloudinary.com/drxuo575c/image/upload/v1674108565/coding-problems/a86a4a238adc8334272099164d2338514964a8a0c39b5481cf578f108ae473f1.jpg)  

The markup of the cards & the list should exactly match the following screenshot:
![picture 6](https://res.cloudinary.com/drxuo575c/image/upload/v1674108723/coding-problems/7cc4f632f15d9baa23cec6cf338ea6a959edb3a947ca49cdda68e11e00a28d46.png)  

Mapping with Response Data:

![picture 9](https://res.cloudinary.com/drxuo575c/image/upload/v1674109790/coding-problems/16351bc0fa02db59505c657f8c7148dbcddffd1f78ca94030aa1230acdd012b9.png)  

Please note: In any of the button/link click, the page should not refresh.


### 3. Able to sort recipes based on price [1]

- On click of `button#sort-low-to-high` the recipe data should be sorted in ascending order of `price`.  
- On click of `button#sort-high-to-low` the recipe data should be sorted in descending order of `price`.

You may use any approach of your choice for sorting. You may sort the available data or you may make a new fetch request to the server and update the list. In case you want to fetch data, please use the [JSON Server documentation](https://github.com/typicode/json-server).

### 4. Able to filter recipes based on price [1]

When the button `#filter-less-than-50` is clicked, the list is expected to be filtered. It should only show the recipes whose `price` is less than 250.

When the button `#filter-more-than-equal-50` is clicked, the list is expected to be filtered. It should only show the recipes whose `price` is more than or equal to 250.

You may use any approach of your choice for filtering. You may filter the available data or you may make a new fetch request to the server and update the list. In case you want to fetch data, please refer to the [JSON Server documentation](https://github.com/typicode/


### 5. Able to populate edit input on edit link click [2]
- The page should not re-load on the click of the EDIT link `.card-item.card-link`
- `#edit-recipe-input-id` should be populated with the `id` of the recipe
- `#edit-recipe-input-price` should be populated with the `price` of the recipe

![picture 10](https://res.cloudinary.com/drxuo575c/image/upload/v1674110383/coding-problems/69446fbfddf5e0d77938bc74461213551ea01f6bede459ce6683b3961af24c96.jpg)  



### 6. Able to edit the price [2]

- Once the edit inputs are populated, if the user clicks `#edit-recipe-button`, the price of that particular recipe should update based on the value entered in the `#edit-recipe-input-price`. 
- The price of the recipe in the list should update without any page reloads.

![picture 11](https://res.cloudinary.com/drxuo575c/image/upload/v1674110679/coding-problems/ebf40926ed592005eb5bfbb6b4466fd2d38ef1e15d31034e14712c9ca644ace2.jpg)  



### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
- Use `${baseServerURL}/what-ever-route` for server url & not `localhost:9090/what-ever-route` in your solution. Failing to do so may cause all the tests to fail.
- If you try to use VSCodes live server, it wont work. Use the npm commands provided in this file only.
