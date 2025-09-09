
const manageSpinner=(status,name)=>{
    console.log("Spinner status:", status, "Target:", name);
if(status==true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById(name).classList.add("hidden");
    } 
        else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById(name).classList.remove("hidden")
    }
}

const loadCategories=()=>{
    manageSpinner(true,"left-section");
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=>res.json())
    .then(data=>{
      addCategories(data.categories)
   manageSpinner(false,"left-section");
    })
}

loadCategories();

const addCategories=(data)=>{
    const category=document.getElementById("categories");
    data.forEach(element => {
        const type=document.createElement("div");
     type.innerHTML = `
        <a onclick="loadCertainTypes(${element.id})" class="category-btn btn btn-outline w-full border-none justify-start text-left hover:bg-green-900 hover:text-white">
          ${element.category_name}
        </a>
   `;
        category.appendChild(type);
    });
}

const loadCertainTypes=(id)=>{
    manageSpinner(true,"mid-section");
 document.querySelectorAll(".category-btn").forEach(btn => {
 btn.classList.remove("bg-green-900", "text-white");
     btn.classList.add("btn-outline"); 
    });

const clickedBtn = document.querySelector(`.category-btn[onclick="loadCertainTypes(${id})"]`);
    if (clickedBtn) {
clickedBtn.classList.add("bg-green-900", "text-white");
    clickedBtn.classList.remove("btn-outline"); 
    }

fetch(`https://openapi.programming-hero.com/api/category/${id}`)
 .then(res=>res.json())
 .then(data=>{
      loadCards(data.plants)
    })
}

const loadAllTypes=()=>{
    manageSpinner(true,"mid-section");
    document.querySelectorAll(".category-btn").forEach(btn => {
 btn.classList.remove("bg-green-900", "text-white");
    btn.classList.add("btn-outline");
    });

    const allTreesBtn = document.querySelector(`.category-btn[onclick="loadAllTypes()"]`);
    if (allTreesBtn) {
    allTreesBtn.classList.add("bg-green-900", "text-white");
        allTreesBtn.classList.remove("btn-outline");
    }

    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=>res.json())
.then(data=>loadCards(data.plants))
}

const loadPlantDetails=(id)=>{
    manageSpinner(true,"details-conatiner");
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res=>res.json())
    .then(data=>{
   displayPlantDeatil(data.plants)
        manageSpinner(false,"details-conatiner");
    })
}

const displayPlantDeatil=(data)=>{
    const detailsBox=document.getElementById("details-conatiner");
    detailsBox.innerHTML=`
        <div class="card w-full h-full flex flex-col justify-between  bg-white p-[16px] space-y-[20px]">
            <h1  class=" font-semibold my-2 text-[1.2rem]">${data.name}</h1>
        <div class="bg-[#EDEDED] w-full h-[240px] flex items-center justify-center overflow-hidden rounded-md">
                <img src="${data.image}" alt="${data.name}" class="h-full w-full object-cover" />
          </div>
            <div ><span class="font-bold text-[1.1rem]">Category: </span>${data.category}</div>
            <div ><span class="font-bold text-[1.1rem]">Price: </span>$${data.price}</div>
          <p><span class="font-bold text-[1.1rem]">Description: </span>${data.description}</p>
        </div>
    `;
    document.getElementById("my_modal_5").showModal();
}

loadAllTypes();

const loadCards=(data)=> {
    const cardContainer=document.getElementById("mid-section");
    cardContainer.innerHTML="";
    data.forEach(element => {
        const type=document.createElement("div");
      type.innerHTML=`
        <div class="card w-full h-full flex flex-col justify-between max-w-[343px] bg-white p-[16px]">
            <div class="bg-[#EDEDED] w-full h-[180px] flex items-center justify-center overflow-hidden rounded-md">
                <img src="${element.image}" alt="${element.name}" class="h-full w-full object-cover" />
            </div>
            <h1 onclick="loadPlantDetails(${element.id})" class="cursor-pointer font-semibold my-2 text-[1.2rem]">${element.name}</h1>
            <p>${element.description}</p>
            <div class="flex justify-between items-center my-[8px]">
             <div class="rounded-xl bg-[#DCFCE7] py-[5px] px-[10px] text-center"><span>${element.category}</span></div>
                <div ><span>$${element.price}</span></div>
            </div>
            <button onclick="addToCart(${element.id})" class="btn w-full rounded-2xl  border-none bg-green-900 text-white hover:bg-green-600">Add to Cart</button>
        </div>
        `;
        cardContainer.appendChild(type);
    });
    manageSpinner(false,"mid-section");
}

