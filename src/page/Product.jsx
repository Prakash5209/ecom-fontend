import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const clickedCategory = location.state?.catename;

  const NavigateproductDetail = (slug) => {
    navigate(`/P/${slug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/category-product/${clickedCategory.name}/`,
        );
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (clickedCategory) {
      fetchData();
    }
  }, [clickedCategory]);

  console.log("productlist", productList);
  // useEffect(() => {
  //   const productList = () => {
  //     axios
  //       .get(
  //         `http://localhost:8000/api/category-product/?category=${clickedCategory}`,
  //       )
  //       .then((item) => {
  //         console.log(item);
  //       });
  //   }; //   productList(); // }, [clickedCategory]);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-white p-4">i am always cat help me!</div>
      <div className="col-span-10 bg-white p-4">
        {clickedCategory.name}
        <div className="grid grid-cols-5">
          {productList.map((item) => (
            <div
              key={item.id}
              className="product-list w-52 cursor-pointer"
              onClick={() => NavigateproductDetail(item.slug)}
            >
              <img
                src="https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
                alt=""
              />
              <div className="p-1">
                {item.title.length > 60 ? (
                  <Typography variant="subtitle2" title={item.title}>
                    {item.title.slice(0, 55)}...
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" title={item.title}>
                    {item.title}
                  </Typography>
                )}
                <Typography variant="subtitle2">{item.price}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
