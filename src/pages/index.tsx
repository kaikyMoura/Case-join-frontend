import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import debounce from "lodash.debounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import styles from './styles.module.css';
import Alert from "@/components/Alert";

const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and padding for docs and sheets.",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 109.95,
    quantity: 10,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description: "Slim-fitting style, contrast raglan long sleeve",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 22.3,
    quantity: 10,
  },
  {
    id: 4,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description: "Slim-fitting style, contrast raglan long sleeve",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 22.3,
    quantity: 10,
  },
  {
    id: 5,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description: "Slim-fitting style, contrast raglan long sleeve",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 22.3,
    quantity: 10,
  },
  {
    id: 6,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description: "Slim-fitting style, contrast raglan long sleeve",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 22.3,
    quantity: 10,
  },
  {
    id: 7,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description: "Slim-fitting style, contrast raglan long sleeve",
    brand: "Fjallraven",
    category: "men's clothing",
    price: 22.3,
    quantity: 10,
  }

]

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleSearch = debounce((filteredData: any[]) => {
    setData(filteredData);
  }, 300);

  useEffect(() => {

    return () => {
      handleSearch.cancel();
    }
  }, [data, handleSearch]);

  return (
    <div className={`gap-8 ${styles.container}`}>
      <div className="mt-8">
        <SearchBar onSearch={handleSearch} keys={["title"]} data={products} />
      </div>

      <ul className="flex flex-wrap justify-center gap-6">
        {data && data.map((product) => (
          <li key={product.id}>
            <Card className={styles.card}>
              <div className="flex flex-col gap-6">
                <div className="relative self-end">
                  <IoMdMore
                    className="cursor-pointer"
                    fontSize={26}
                    color="#808080"
                    data-tooltip-id="my-tooltip" data-tooltip-content="Show more options"
                    onClick={() => setOpenDropdown(product.id)}
                  />

                  {openDropdown === product.id && (
                    <div
                      className="absolute left-0 top-full mt-2 w-32 bg-white border rounded-md shadow-lg"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <ul className="p-2 space-y-1">
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => setShowAlert(true)}
                        >
                          Delete
                        </li>
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => console.log("Edit clicked")}
                        >
                          Edit
                        </li>
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => console.log("View clicked")}
                        >
                          View
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {product.image && <Image src={product.image} alt={product.title} width={400} height={400} />}

                <h3 className="font-bold text-lg">{product.title}</h3>
                <p className="font-normal">{product.description}</p>
                <p className="font-semibold">Brand: {product.brand}</p>
                <p className="font-semibold">Category: {product.category}</p>

                <div className="flex justify-between">
                  <p className="font-semibold">Price: {product.price}</p>
                  <p className="font-semibold text-sm">Quantity avalaible: {product.quantity}</p>
                </div>

              </div>
            </Card>
          </li>
        ))}
      </ul>
      {showAlert && <Alert Close={() => setShowAlert(false)} title="Warning" type="warning"
        text="Are you sure you want to delete this product?" />
        }
    </div>
  );
}

export default Home;