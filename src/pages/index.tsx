import Alert from "@/components/Alert";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import SearchBar from "@/components/SearchBar";
import { createProduct, deleteProductById, findProducts } from "@/services/productService";
import { Category } from "@/types/CategoryEnum";
import { Product } from "@/types/Product";
import debounce from "lodash.debounce";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowForward, IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import styles from './styles.module.css';


const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);

  // 'open' action fields
  const [openOptions, setOpenOptions] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const [ isUpdated, setIsUpdated ] = useState(false);

  // Alert fields
  const [title, setTitle] = useState('')
  const [type, setType] = useState<"error" | "sucess" | "notification" | "warning">()
  const [text, setText] = useState('')

  // product fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>();
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState<number>();

  const handleSearch = debounce((filteredData: Product[]) => {
    setProducts(filteredData);
  }, 300);


  const fetchProducts = async () => {
    try {
      const response = await findProducts()
      if (response.success === true) {
        setProducts(response.data!);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  /**
   * Handles the creation of a new product by calling `createProduct` and
   * displaying an alert with either a success or error message.
   *
   * Before calling `createProduct`, this function checks that all required
   * fields are filled and sets the `category` field if `selected` is set to a
   * valid `Category` value.
   *
   * If the response from `createProduct` is successful, the alert is displayed
   * with a "sucess" type and the message from the response. Otherwise, the alert
   * is displayed with an "error" type and the error message from the response.
   *
   * In either case, the modal is closed and the alert is displayed.
   */
  const addProduct = async () => {
    if (Object.values(Category).includes(selected as Category)) {
      setCategory(selected as Category);
    }

    if (!name || !description || !category || !brand || !price || !quantity) {
      console.error("All product fields must be filled.");
      return;
    }

    const product: Product = {
      name: name,
      description: description,
      brand: brand,
      category: category!,
      price: parseFloat(price.toString()),
      quantity: quantity!
    }

    console.log(product)

    const response = await createProduct(product)
    if (response.success === true) {
      setType("sucess")
      setTitle("Sucess")
      setText(response.message!)
      setOpenModal(false)
      setShowAlert(true)
      fetchProducts()
    }
    else {
      setType("error")
      setTitle("Error")
      setText(response.error!)
      setShowAlert(true)
    }
  }

  const deleteProduct = async (id: string) => {
    console.log(id)

    const response = await deleteProductById(id)
    if (response.success === true) {
      setType("sucess")
      setTitle("Sucess")
      setText(response.message!)
      setOpenModal(false)
      setShowAlert(true)
      fetchProducts()
    }
    else {
      setType("error")
      setTitle("Error")
      setText(response.error!)
      setShowAlert(true)
    }
  }

  useEffect(() => {

    fetchProducts();
  }, [])

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    }
  }, [products, handleSearch]);

  return (
    <div className={`gap-8 ${styles.container}`}>

      <div className="flex items-center mt-20">
        <button className="cursor-pointer mr-6 bg-black hover:bg-[#808080] text-white w-40 h-10 px-4 rounded-md"
          type="button" onClick={() => setOpenModal(true)}>Add product</button>
        <SearchBar onSearch={handleSearch} keys={["name"]} data={products} />
        <IoFilter className={`cursor-pointer -ml-6 z-100 ${styles.filterIcon}`} fontSize={26} />
      </div>

      <ul className="flex flex-wrap justify-center gap-6">
        {products && products.map((product) => (
          <li key={product.id}>
            <Card className={styles.card}>
              <div className="flex flex-col gap-6">
                <div className="relative self-end">
                  <IoMdMore
                    className="cursor-pointer"
                    fontSize={26}
                    color="#808080"
                    data-tooltip-id="my-tooltip" data-tooltip-content="Show more options"
                    onClick={() => setOpenOptions(product.id!)}
                  />

                  {openOptions === product.id && (
                    <div
                      className="absolute left-0 top-full mt-2 w-32 bg-white border rounded-md shadow-lg"
                      onMouseLeave={() => setOpenOptions(null)}
                    >
                      <ul className="p-2 space-y-1">
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => deleteProduct(product.id!)}
                        >
                          Delete
                        </li>
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => console.log(product.id)}
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

                {/* {product.image && <Image src={product.image} alt={product.title} width={400} height={400} />} */}

                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="font-normal">{product.description}</p>
                <p className="font-semibold">Brand: {product.brand}</p>
                <p className="font-semibold">Category: {product.category}</p>

                <div className="flex justify-between">
                  <p className="font-semibold">Price: $ {product.price}</p>
                  <p className="font-semibold text-sm">Quantity avalaible: {product.quantity}</p>
                </div>

              </div>
            </Card>
          </li>
        ))}
      </ul>

      {openModal &&
        <Modal isModalOpen={openModal} closeModal={() => setOpenModal(false)}>
          <h2 className="text-center text-2xl font-bold mb-4">Add product</h2>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-normal">Name</label>
              <input className={`${styles.modalInput}`} type="text" placeholder="name" value={name}
                onChange={(event: { target: { value: SetStateAction<string> } }) => setName(event.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Description</label>
              <textarea className={`resize-none ${styles.modalInput}`} placeholder="description" value={description}
                onChange={(event: { target: { value: SetStateAction<string> } }) => setDescription(event.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Brand</label>
              <input className={`${styles.modalInput}`} type="text" placeholder="brand" value={brand}
                onChange={(event: { target: { value: SetStateAction<string> } }) => setBrand(event.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Category</label>
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`flex items-center justify-between cursor-pointer ${styles.modalInput}`}
              >
                {selected || "select a category"}
                <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdown ? "rotate-90" : ""}`} fontSize={20} />
              </button>
              {openDropdown && (
                <ul className={`${styles.options}`}>
                  {Object.entries(Category).map(([key, value]) => (
                    <li key={key} className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected(value);
                        setOpenDropdown(false);
                      }} >
                      {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Price</label>
              <input className={`${styles.modalInput}`} type="decimal" placeholder="price" value={price}
                onChange={(event: { target: { value: SetStateAction<string> } }) => setPrice(event.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Quantity</label>
              <input className={`${styles.modalInput}`} type="number" placeholder="quantity" min={1} value={quantity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setQuantity(event.target.value ? Number(event.target.value) : undefined)} />
            </div>
            <div className="flex justify-between w-full">
              <button className="cursor-pointer bg-[#808080] hover:bg-[black] text-white w-30 h-10 px-4 rounded-md"
                type="button" onClick={() => setOpenModal(false)}>cancel</button>
              <button className="cursor-pointer bg-black hover:bg-[#808080] text-white w-30 h-10 px-4 rounded-md"
                type="button" onClick={addProduct}>add product</button>
            </div>
          </form>
        </Modal>}

      {showAlert && <Alert Close={() => setShowAlert(false)} title={title} type={type!}
        text={text} />
      }
    </div>
  );
}

export default Home;