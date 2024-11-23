
let x = document.querySelector(".parent");

if(localStorage.getItem('cartItem') != null){
   let selItem = JSON.parse( localStorage.getItem('cartItem'));
   selItem.forEach((ele)=>{
       x.innerHTML += `
            <div class="selectedcards">
            <img src="${ele.img}"/>
            <div class="texts">
            <p class="name">${ele.title}</p>
            <p class="price">${ele.price}</p>
            <p class="num">${ele.pieces} with ${ele.spicy}</p>
          </div>
       `
   })

}
 
