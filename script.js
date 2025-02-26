const add = document.getElementById("add");
const Productname = document.getElementById("name");
const Productprice = document.getElementById("price");
const Productdescription = document.getElementById("description");
const tableBody = document.getElementById("table-result");

let currentIndex = 0;
let products;

const nameRegex = /^[A-Z][a-zA-Z]{4,}$/;
const priceRegex = /^(100|[1-9]\d{2,})$/;
const descRegex = /^.{20,}$/;

const validateProductName = () => {
  if (nameRegex.test(Productname.value) === false) {
    Productname.classList.add("is-invalid");
    Productname.classList.remove("is-valid");
    return false;
  } else {
    Productname.classList.add("is-valid");
    Productname.classList.remove("is-invalid");
    return true;
  }
};

const validatePrice = () => {
  if (!priceRegex.test(Productprice.value.trim())) {
    Productprice.classList.add("is-invalid");
    Productprice.classList.remove("is-valid");
    return false;
  } else {
    Productprice.classList.add("is-valid");
    Productprice.classList.remove("is-invalid");
    return true;
  }
};

const validateDescription = () => {
  if (!descRegex.test(Productdescription.value.trim())) {
    Productdescription.classList.add("is-invalid");
    Productdescription.classList.remove("is-valid");
    return false;
  } else {
    Productdescription.classList.add("is-valid");
    Productdescription.classList.remove("is-invalid");
    return true;
  }
};

const addProduct = () => {
  if (validateProductName() && validatePrice() && validateDescription()) {
    const product = {
      name: Productname.value,
      price: Productprice.value,
      description: Productdescription.value,
    };

    products.push(product);
    saveToLocalStorage();
    display(products);
    clear();
  }
};

const updatePro = () => {
  const product = {
    name: Productname.value,
    price: Productprice.value,
    description: Productdescription.value,
  };

  products[currentIndex] = product;
  saveToLocalStorage();
  display(products);
  clear();

  add.innerHTML = "add";
};

const deletepro = (i) => {
  products.splice(i, 1);
  saveToLocalStorage();
  display(products);
};

const showpro = (i) => {
  currentIndex = i;
  Productname.value = products[i].name;
  Productprice.value = products[i].price;
  Productdescription.value = products[i].description;

  add.innerHTML = "Update";
};

const display = (products) => {
  let result = "";
  for (let i = 0; i < products.length; i++) {
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
};

const clear = () => {
  Productname.value = "";
  Productprice.value = "";
  Productdescription.value = "";
};

const search = (term) => {
  const newdata = products.filter((product) => {
    return product.name.toLowerCase().includes(term.trim().toLowerCase());
  });

  display(newdata);
};

const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

Productname.addEventListener("keyup", validateProductName);
Productprice.addEventListener("keyup", validatePrice);
Productdescription.addEventListener("keyup", validateDescription);

add.addEventListener("click", () => {
  if (add.innerHTML.toLowerCase() === "add") {
    addProduct();
  } else {
    updatePro();
  }
});

if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  display(products);
} else {
  products = [];
}
