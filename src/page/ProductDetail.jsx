import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Button from "@mui/material/Button";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Typography } from "@mui/material";
import axios from "axios";
const ProductDetail = () => {
  const [detail, setDetail] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  const currentUrl = window.location.href.split("/");
  const currentValue = currentUrl[currentUrl.length - 1];

  let safeHTML = "";
  if (detail !== null) {
    safeHTML = DOMPurify.sanitize(detail.description);
  }

  useEffect(() => {
    const productInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product-detail/${currentValue}`,
        );
        setDetail(response.data);
        console.log(response.data);
        console.log("product save in detail usestate successfully");
      } catch (error) {
        console.log("error", error);
      }
    };
    productInfo();
  }, []);

  //stockvalue to store in state
  const [stockValue, setStockValue] = useState(1);
  const MinusFunction = () => {
    if (stockValue > 0) {
      setStockValue(stockValue - 1);
    }
  };
  const PlusFunction = () => {
    if (stockValue < detail.stock) {
      setStockValue(stockValue + 1);
    }
  };

  //fetch productdetail

  //add to cart with certain condition
  const addtoCart = () => {};

  if (!detail) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid place-items-center">
      <div className="p-3 m-4 w-full lg:w-[1200px]">
        <div className="grid grid-cols-[1fr,2fr]">
          <div className="border-2"></div>
          <div className="border-2">
            <div className="okay">
              <Typography variant="h4">{detail.title}</Typography>

              {/* <p>{detail.category}</p> */}
              {detail.category.name}
              <p>stock: {detail.stock}</p>
              {detail.stock > 0 ? <p>In stock</p> : <p>Out of stock</p>}
              <p>{detail.price}</p>
            </div>
            <div className="flex">
              {detail.product_color.map((col) => (
                // <Typography variant="p">{col.color}</Typography>
                // <Typography>{col.color}</Typography>;
                <div
                  className={`border px-1 mx-1 cursor-pointer ${color === col.color ? "bg-green-500" : "bg-none"}`}
                  key={col.id}
                  onClick={() => {
                    if (color === col.color) {
                      setColor(null);
                    } else {
                      setColor(col.color);
                    }
                  }}
                >
                  {col.color}
                </div>
              ))}
            </div>
            <div className="flex">
              {detail.product_size.map((item) => (
                <div
                  className={`border px-4 mx-1 cursor-pointer ${size === item.size ? "bg-green-500" : "bg-none"}`}
                  key={item.id}
                  onClick={() => {
                    if (size === item.size) {
                      setSize(null);
                    } else {
                      setSize(item.size);
                    }
                  }}
                >
                  {item.size}
                </div>
              ))}
            </div>
            <div>
              <Button size="small" onClick={MinusFunction}>
                <FaMinus />
              </Button>
              <input
                type="text"
                className="w-12 border-2 text-center"
                value={stockValue ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!isNaN(val) && detail.stock >= val) {
                    setStockValue(Number(val));
                  }
                }}
              />
              <Button size="small" onClick={PlusFunction}>
                <FaPlus />
              </Button>
              <Button variant="contained" size="small" onClick={addtoCart}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        <div
          className="no-tailwind-list"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(safeHTML),
          }}
        />
      </div>
    </div>
  );
};
export default ProductDetail;
