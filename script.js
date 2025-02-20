var add = document.getElementById("add");
var Productname = document.getElementById("name");
var Productprice = document.getElementById("price");
var Productdescription = document.getElementById("description");
var tableBody = document.getElementById("table-result");
var currentIndex = 0;
var products;

var nameRegex = /^[A-Z][a-zA-Z]{4,}$/;

function validateProductName() {
  if (nameRegex.test(Productname.value) == false) {
    Productname.classList.add("is-invalid");
    Productname.classList.remove("is-valid");

    return false;
  } else {
    Productname.classList.add("is-valid");
    Productname.classList.remove("is-invalid");

    return true;
  }
}

if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  display(products);
} else {
  products = [];
}

Productname.addEventListener("keyup", validateProductName);
Productprice.addEventListener("keyup", validatePrice);
Productdescription.addEventListener("keyup", validateDescription);

function addProduct() {
  if (validateProductName() && validatePrice() && validateDescription()) {
    var product = {
      name: Productname.value,
      price: Productprice.value,
      description: Productdescription.value,
    };

    products.push(product);
    saveToLocalStorage(products);
    display(products);
    clear();
  }
}
var priceRegex = /^(100|[1-9]\d{2,})$/;
function validatePrice() {
  if (!priceRegex.test(Productprice.value.trim())) {
    Productprice.classList.add("is-invalid");
    Productprice.classList.remove("is-valid");
    return false;
  } else {
    Productprice.classList.add("is-valid");
    Productprice.classList.remove("is-invalid");
    return true;
  }
}

var descRegex = /^.{20,}$/;
function validateDescription() {
  if (!descRegex.test(Productdescription.value.trim())) {
    Productdescription.classList.add("is-invalid");
    Productdescription.classList.remove("is-valid");
    return false;
  } else {
    Productdescription.classList.add("is-valid");
    Productdescription.classList.remove("is-invalid");
    return true;
  }
}

function display(products) {
  var result = "";
  for (var i = 0; i < products.length; i++) {
    result += `
             <tr>
                 <td>${products[i].name}</td>
                 <td>${products[i].price}</td>
                 <td>${products[i].description}</td>
                 <td>
                     <button class="btn btn-primary btn-sm p-2 mx-2" onclick="showpro(${i})">Update</button>
                     </td>
                     <td>
                     <button class="btn btn-danger btn-sm p-2 mx-2" onclick="deletepro(${i})">Delete</button>
                     </td>
            </tr>
         `;
  }
  tableBody.innerHTML = result;
}

function clear() {
  Productname.value = "";
  Productprice.value = "";
  Productdescription.value = "";
}

function search(term) {
  var newdata = products.filter(function (product) {
    return product.name.includes(term.trim());
  });

  display(newdata);
}

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function deletepro(i) {
  products.splice(i, 1);
  saveToLocalStorage();
  display(products);
}

add.addEventListener("click", function () {
  if (add.innerHTML == "add") {
    addProduct();
  } else {
    updatePro();
  }
});

function showpro(i) {
  currentIndex = i;
  Productname.value = products[i].name;
  Productprice.value = products[i].price;
  Productdescription.value = products[i].description;

  add.innerHTML = "Update";
}
function updatePro() {
  var product = {
    name: Productname.value,
    price: Productprice.value,
    description: Productdescription.value,
  };

  products[currentIndex] = product;
  saveToLocalStorage();
  display(products);
  clear();

  add.innerHTML = "add";
}
