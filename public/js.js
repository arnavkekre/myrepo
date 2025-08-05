/*const http =require ('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const home = fs.readFileSync('index.html');
const furryfriends= fs.readFileSync('furryfriends.html');
const dogfood = fs.readFileSync('dogfood.html');
const dogcare = fs.readFileSync('dogcare.html');
const breeds = fs.readFileSync('breeds.html');
const server = http.createServer((req, res) => {
    console.log(req.url);
    url= req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/') {
        res.end(home);
    } else if (req.url === '/furryfriends') {
        res.end(furryfriends); 
    } else if (req.url === '/dogfood') {
        res.end(dogfood);
    } else if (req.url === '/dogcare') {
        res.end(dogcare);
    } else if (req.url === '/breeds') {
        res.end(breeds);
    } else {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
    }
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
/*console.log("hey")
function search(value) {
    const input = document.getElementById("bar");

    // Replace 'x' with '*' for JS evaluation
    if (value === 'x') {
        input.value += '*';
    } 
    // Replace 'π' with Math.PI
    else if (value === 'π') {
        input.value += Math.PI;
    } 
    // Replace 'e' with Math.E
    else if (value === 'e') {
        input.value += Math.E;
    } 
    // Add math functions correctly
    else if (value === 'sin()') {
        input.value += 'Math.sin(';
    } 
    else if (value === 'cos()') {
        input.value += 'Math.cos(';
    } 
    else if (value === 'tan()') {
        input.value += 'Math.tan(';
    } 
    else if (value === 'log()') {
        input.value += 'Math.log10(';
    } 
    else if (value === 'ln()') {
        input.value += 'Math.log(';
    } 
    else if (value === '√()') {
        input.value += 'Math.sqrt(';
    } 
    else if (value === 'x!') {
        input.value += '!'; // handled separately below
    } 
    else if (value === '=') {
        try {
            let expression = input.value;

            // Handle factorial
            expression = expression.replace(/(\d+)!/g, (_, num) => {
                return factorial(parseInt(num));
            });

            const result = eval(expression);
            input.value = result;
        } catch (e) {
            input.value = "Error";
        }
    } 
    else {
        input.value += value;
    }
}
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

function deletelast(){
    const input = document.getElementById("bar");
    input.value = input.value.slice(0,-1);
}
function allclear(){
    document.getElementById("bar").value="";
}*/
function menu(){
    window.location.href="/furryfriends.html";
}
function leader(){
    window.location.href="/dogfood.html";
}
function dropdown(btn) {
    let drop = btn.nextElementSibling;
    if (drop && drop.classList.contains("drop")) {
        if (drop.style.display === "none" || drop.style.display === "") {
            drop.style.display = "block";
        } else {
            drop.style.display = "none";
        }
    }
}
function checksub(){
    const subbut= document.querySelector('.submit');
    const maxques= Number(localStorage.getItem("numofques"));
    if (isNaN(maxques) || maxques <= 0) {
        console.warn("Invalid max questions in localStorage:", localStorage.getItem("numofques"));
        subbut.style.display = "none";
        return;
    }
    if (i===maxques){
        subbut.style.display="block"
    }
    else{
        subbut.style.display="none"
    }
}
let i=1;
function updatenum(){
    let box= document.getElementById('num');
    box.textContent = i;
}
function increment() {
    const max= Number(localStorage.getItem("numofques"));
    if (i<max){
    i++;
    updatenum();
    checksub();
}
    
}
function decrement() {
    if(i>1){i--
    updatenum();
    checksub();}
}
function dostuff(){
    const queschosen= document.querySelector('input[name="chosen"]:checked');
if (queschosen){
    localStorage.setItem("numofques", queschosen.value);
    window.location.href="/breeds.html";
}
else{
    alert("select the number of ques");
}
    
}
window.onload = function() {
let box = document.getElementById("num");
let sub= document.querySelector(".submit");
box.style.backgroundColor = "#580aa1";
box.style.color = "white";
box.style.position= "absolute";
box.style.width = "50px";
box.style.height = "50px";
box.style.top = "32px";
box.style.left = "205px";
box.style.fontSize = "50px";

const storedNum = Number(localStorage.getItem("numofques"));
    if (isNaN(storedNum)) {
        console.warn("No valid number of questions found. Defaulting to 1.");
        localStorage.setItem("numofques", "1");
    } else {
        console.log("Number of questions loaded:", storedNum);
    }
updatenum();
checksub();
}