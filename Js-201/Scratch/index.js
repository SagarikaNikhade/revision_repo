let first_name = document.getElementById("first_name");
let last_name = document.getElementById("last_name");
let roll_no = document.getElementById("roll_no");
let submit_btn = document.getElementById("submit_btn");

submit_btn.addEventListener("click",function(){
    let first = first_name.value
    let last = last_name.value
    let roll = roll_no.value

    let obj = {
        first,last,roll
    }

    fetch("")
})