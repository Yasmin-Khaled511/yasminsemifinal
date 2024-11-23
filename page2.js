const PORT_NUM ='https://yasminsemifinal.vercel.app'
let selectedCatId = "";

async function getCatergories() {
  const response = await fetch(`${PORT_NUM}/categories`);
  const result = await response.json();

  result.forEach((ele) => {
    let dummyImgID = Math.floor(Math.random() * 1000000);
    let dummyActive = ele.isActive == 1 ? 'class="selected"' : "";
    if (ele.isActive == 1) {
      selectedCatId = ele.catId;
    }
    document.querySelector(".circles").innerHTML += `
      <div class="select" onclick=getID(${ele.id},'${ele.catId}','${dummyImgID}')>
        <img ${dummyActive} id='${dummyImgID}' src='${ele.img}'>
        <p> ${ele.title}</p>
      </div>
    `;
  });
}
getCatergories();

function getID(id, catId, imgID) {
  debugger;
  selectedCatId = catId;

  document.querySelectorAll(".select img").forEach((ele) => {
    ele.removeAttribute("class");
  });
  document.getElementById(imgID).classList.add("selected");
  getCards();
}

let final;
async function getCards() {
  let final = undefined;
  // if (localStorage.getItem("AllCards") == null) {
  const cards = await fetch( `${PORT_NUM}/cardsg`);
  final = await cards.json();
  localStorage.setItem("AllCards", JSON.stringify(final));
  // } else {
  //   final = JSON.parse(localStorage.setItem("AllCards"));
  // }
  document.querySelector(".second").innerHTML = "";
  final.forEach((ele) => {
    if (ele.catId == selectedCatId) {
      document.querySelector(".second").innerHTML += `
    <div class="cards">
    <div class="card">
        <img src='${ele.img}'>
        <div class="heart-icon"><i class="fa-solid fa-heart"></i></div>
         <div class="price">
         <h2> ${ele.price} </h2>
         <i class="fa-solid fa-star">${ele.rating}</i>
         </div>
        <div class="line"> </div>
        <h3> ${ele.title}</h3>
        <div class="two">
            <p><img src="./Photos/Frame 7.png"> ${ele.pieces}</p>
            <p><img src="./Photos/Frame 7.png">${ele.spicy}</p>
        </div>
        <button onclick=addtocart(${ele.id})> Add to Cart </button>
       </div>
       </div>
    `;
    }
  });
}
getCards();

let cartItems = [];
let counter = 0;

function addtocart(id) {
  let allCards = JSON.parse(localStorage.getItem("AllCards"));
  let selectedCard = allCards[id - 1];

  let filteredItem = cartItems.filter((card) => card.id == id);
  if (filteredItem.length == 0) {
    cartItems.push(selectedCard);
    counter++;
    // counterdiv.innerHTML = counter;
    if (localStorage.getItem("mycounter") == null) {
      localStorage.setItem("mycounter", counter);
    } else {
      let savedCnt = localStorage.getItem("mycounter");
      savedCnt++;
      localStorage.setItem("mycounter", savedCnt);
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }
}
// addtocart(id)
