let title = document.getElementById('title');
let price = document.getElementById('price');
let adds = document.getElementById('adds');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let taxes = document.getElementById('taxes');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let bigSearch = document.getElementById('bigSearch');


function get_total(){
    if(price.value != ''){
        let result = (+price.value + +adds.value + +taxes.value) - +discount.value ;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    } else{
        total.innerHTML = '';
        total.style.backgroundColor = 'blueviolet';
    }
}



let temp;
let mood = 'create';


let data_of_products = [];
if(localStorage.pro != null){
    data_of_products = JSON.parse(localStorage.pro);
} else{
    data_of_products = [];
}




function baseCreate(){
    submit.onclick = function(){
        let product = {
            title:title.value.toLowerCase(),
            adds:adds.value,
            category:category.value.toLowerCase(),
            total:total.innerHTML,
            price:price.value,
            count:count.value,
            discount:discount.value,
            taxes:taxes.value,
        };
                
        // if(title.value != "" ){
            
        // }
        if(mood == 'create'){
            if(product.count > 1){
                for(let i =0; i<product.count; i++){
                    data_of_products.push(product);
                }
            } else{
                data_of_products.push(product)
            }
        } else{
            data_of_products[temp] = product;
            mood = 'update';
            count.style.display = 'block';
            bigSearch.style.display = 'block';
            submit.innerHTML = 'create';
        }
        
        clear();
        localStorage.setItem("pro", JSON.stringify(data_of_products));
        read(); 
    }
}
baseCreate();

document.onkeyup = function(e){
    if(e.key === "Escape"){
        submit.click();
    }
    
};

function clear(){
    title.value = '';
    count.value = '';
    price.value = '';
    taxes.value = '';
    adds.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = '';
};


function read(){
    get_total();
let table = '';
for(let i =0; i<data_of_products.length; i++){
    table+= `
    <tr>
    <td>${i + 1}</td>
    <td>${data_of_products[i].title}</td>
    <td>${data_of_products[i].price}</td>
    <td>${data_of_products[i].taxes}</td>
    <td>${data_of_products[i].adds}</td>
    <td>${data_of_products[i].discount}</td>
    <td>${data_of_products[i].total}</td>
    <td>${data_of_products[i].category}</td>
    <td><button id="update" onclick =" update(${i})"> update </button> </td>
    <td><button id="del" onclick="delete_product(${i})"> delete </button> </td>
</tr>
    `
}
document.getElementById('tbody').innerHTML = table;
let deleteAll = document.getElementById('deleteall');
if(data_of_products.length > 1){
    deleteAll.innerHTML = `<button onclick="delete_all_products() "> delete All (${data_of_products.length}) </button>`;
} else{
    deleteAll.innerHTML = ''
}
};

read();


function delete_all_products(){
    localStorage.clear();
    data_of_products.splice(0);
    read();
}

function delete_product(i){
    data_of_products.splice(i,1);
    localStorage.pro = JSON.stringify(data_of_products);
    read();
}

function update(i){
    title.value = data_of_products[i].title;
    price.value = data_of_products[i].price;
    adds.value = data_of_products[i].adds;
    discount.value = data_of_products[i].discount;
    taxes.value = data_of_products[i].taxes;
    category.value = data_of_products[i].category;
    get_total();
    count.style.display='none';
    submit.innerHTML = "udpate";
    bigSearch.style.display = 'none';
    mood = 'udpate';
    temp = i;
    scroll({
        top:0,
        behavior:"smooth",
    });
    };


    let search_mood = 'title';
    function search_ele(id){
        let search  = document.getElementById('srch');
        if(id == 'search_title'){
            search_mood= 'title';
        }else{
            search_mood = 'category';
        }
        search.placeholder=`search by ${search_mood} `
        search.focus();
        search.value = '';
        read();
    };

    function search_product(value){
        let table = '';
        for(let i =0; i<data_of_products.length; i++){
            if(search_mood == 'title'){
            if(data_of_products[i].title.includes(value.toLowerCase())){
                table+= `
                <tr>
                <td>${i + 1}</td>
                <td>${data_of_products[i].title}</td>
                <td>${data_of_products[i].price}</td>
                <td>${data_of_products[i].taxes}</td>
                <td>${data_of_products[i].adds}</td>
                <td>${data_of_products[i].discount}</td>
                <td>${data_of_products[i].total}</td>
                <td>${data_of_products[i].category}</td>
                <td><button id="update" onclick =" update(${i})"> update </button> </td>
                <td><button id="del" onclick="delete_product(${i})"> delete </button> </td>
            </tr>
                `

            }
            } else{
                if(data_of_products[i].category.includes(value.toLowerCase())){
                    table+= `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${data_of_products[i].title}</td>
                    <td>${data_of_products[i].price}</td>
                    <td>${data_of_products[i].taxes}</td>
                    <td>${data_of_products[i].adds}</td>
                    <td>${data_of_products[i].discount}</td>
                    <td>${data_of_products[i].total}</td>
                    <td>${data_of_products[i].category}</td>
                    <td><button id="update" onclick =" update(${i})"> update </button> </td>
                    <td><button id="del" onclick="delete_product(${i})"> delete </button> </td>
                </tr>
                    `
                }
            }
        }
        document.getElementById('tbody').innerHTML = table;
   
    }
