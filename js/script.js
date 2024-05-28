const data = [
  {
    id: 1,
    name: "Moye Moye 1",
    img: "https://m.media-amazon.com/images/I/51vSiDswk6L._SX679_.jpg",
    price: 100,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Moye Moye 2",
    img: "https://m.media-amazon.com/images/I/81W7jskF07L._SX679_.jpg",
    price: 200,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Moye Moye 3",
    img: "https://m.media-amazon.com/images/I/81gjuM7ynYL._SX679_.jpg",
    price: 150,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Moye Moye 4",
    img: "https://m.media-amazon.com/images/I/611VB8dHBPL._SX679_.jpg",
    price: 320,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Moye Moye 5",
    img: "https://m.media-amazon.com/images/I/71HS506liEL._SX522_.jpg",
    price: 574,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (item) => {
  //   display all product with details
  productsContainer.innerHTML = item
    .map(
      (product) =>
        `<div class="product">
                    <img src=${product.img} alt=""/>
                    <span class="name">${product.name}</span>
                    <span class="priceText">INR${product.price}</span>
                </div>
        `
    )
    .join(""); // Join is use to create all array use in single string
};
displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  // Search all Product with name
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
        <span class="cat">${cat}</span>
        `
    )
    .join("");
    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent;
    
        selectedCat === "All"
          ? displayProducts(data)
          : displayProducts(data.filter((item) => item.cat === selectedCat));
      });
};

const setPrices = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
  
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "INR " + maxPrice;
  
    priceRange.addEventListener("input", (e) => {
      priceValue.textContent = "INR " + e.target.value;
      displayProducts(data.filter((item) => item.price <= e.target.value));
    });
  };
  
  setCategories();
  setPrices();