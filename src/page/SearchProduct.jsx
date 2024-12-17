import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function SearchProduct() {
  const location = useLocation();
  const { searchQuery } = location.state || {}; // items from navbar search field
  const navigate = useNavigate();
  const { search } = useLocation(); // getting the search from current url (product name or category name)
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      setProductList(searchQuery);
    }
  }, [searchQuery]);

  console.log("---------productList", productList);
  // searched name from url
  const item_name = search.split("=")[1];

  const NavigateproductDetail = (slug) => {
    navigate(`/P/${slug}`);
  };

  // productcard
  const ProductCard = ({ item, onNavigate }) => (
    <div
      className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => onNavigate(item.slug)}
    >
      <div className="relative">
        <img
          src={
            `http://localhost:8000/${item.productmodel_image[0].image}` ||
            "https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
          }
          alt={item.title}
          className="w-full h-48 object-cover"
        />

        {/* heart and cart button */}
        {/* <div className="absolute top-2 right-2 flex space-x-2">
            <button className="bg-white/50 rounded-full p-2 hover:bg-white">
              <Heart className="text-gray-600 w-5 h-5" />
            </button>
            <button className="bg-white/50 rounded-full p-2 hover:bg-white">
              <ShoppingCart className="text-gray-600 w-5 h-5" />
            </button>
          </div> */}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
          {item.title.length > 60
            ? `${item.title.slice(0, 55)}...`
            : item.title}
        </h3>
        <div className="flex justify-between items-center">
          <Typography variant="subtitle2" className="text-gray-700">
            ${item.price}
          </Typography>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  //filter price range from this function
  const [priceRange, setPriceRange] = useState([0, 0]);
  console.log("price range", priceRange);

  const price_range_filter = async (e) => {
    e.preventDefault();

    if (priceRange[0] >= 0 && priceRange[1] >= 0) {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/p/?text=${item_name}&minp=${priceRange[0]}&maxp=${priceRange[1]}`,
        );
        console.log("response.data", response.data);
        setProductList(response.data);
        if (response.status === 200) {
          setLoading(false);
        } else if (response.status === 204) {
          alert("no content found");
          setLoading(true);
        } else {
          setTimeout(alert("no content found 024", 5000));
          setLoading(true);
        }
      } catch (error) {
        console.error("error", error);
      }
    } else {
      alert("invalid price range");
    }
  };

  // searched result
  const ary = [];

  // for (var j of productList) {
  //   console.log("productlis----------", j);
  // }

  for (var i in productList) {
    if (ary.includes(productList[i].category.name)) {
    } else {
      ary[i] = productList[i].category.name;
    }
    //console.log(searchQuery[i].category.name);
  }
  const lst_price = [];
  productList.forEach((i) => {
    lst_price.push(i.price);
    console.log("iterate", i.price);
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    // <div>
    //   {searchQuery.map((i) => (
    //     <p key={i.id}>{i.title}</p>
    //   ))}
    // </div>
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="col-span-2 p-4 border-r-2">
        <div>
          <span className="text-lg mb-4">Categories:</span>
          <ol className="">
            {ary.map((item, index) => (
              <li
                key={index}
                className="pointer"
                onClick={() => navigate(`/category/${item}/`)}
              >
                {item}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <Stack component="form" spacing={1} onSubmit={price_range_filter}>
            <TextField
              id="outlined-basic"
              label="min price"
              variant="outlined"
              size="small"
              type="number"
              onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
            />
            <TextField
              id="outlined-basic"
              label="max price"
              variant="outlined"
              size="small"
              type="number"
              onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            />
            <Button variant="outlined" size="small" type="submit">
              submit
            </Button>
          </Stack>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-10 p-4">
        {Object.keys(productList).length === 0 ? (
          <div className="text-center text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productList.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onNavigate={NavigateproductDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
