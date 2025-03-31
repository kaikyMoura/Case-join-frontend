import Alert from "@/components/Alert";
import Card from "@/components/Card";
import FilterModal from "@/components/FilterModal";
import Modal from "@/components/Modal";
import SearchBar from "@/components/SearchBar";
import { createProduct, deleteProductById, findProductById, findProducts, updateProduct } from "@/services/productService";
import { Category } from "@/types/CategoryEnum";
import { Product } from "@/types/Product";
import { ProductFilterDto } from "@/types/ProductFilterDto";
import debounce from "lodash.debounce";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowForward, IoMdMore } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import styles from './styles.module.css';


const Home = () => {

  const [id, setId] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);

  // 'open' action fields
  const [openFilterOptions, setOpenFilterOptions] = useState(false);
  const [openOptions, setOpenOptions] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [updating, setUpdating] = useState(false)
  const [selected, setSelected] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<ProductFilterDto>();

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
    setIsLoading(true)
    const response = await findProducts((filters ? filters : {} as ProductFilterDto))
    if (response.success === true) {
      setIsLoading(false)
      setProducts(response.data!);
    }
  };

  const addProduct = async () => {
    if (Object.values(Category).includes(selected as Category)) {
      setCategory(selected as Category);
    }

    if (!name || !description || !category || !brand || !price || !quantity) {
      setType("error")
      setTitle("Error")
      setText("All product fields must be filled.")
      setShowAlert(true)
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

  const editProduct = async () => {
    if (Object.values(Category).includes(selected as Category)) {
      setCategory(selected as Category);
    }

    if (!name || !description || !category || !brand || !price || !quantity) {
      setType("error")
      setTitle("Error")
      setText("All product fields must be filled.")
      setShowAlert(true)
      return;
    }

    const product: Product = {
      id: id,
      name: name,
      description: description,
      brand: brand,
      category: category!,
      price: parseFloat(price.toString()),
      quantity: quantity!
    }

    const response = await updateProduct(product)
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

  const handleFilterChange = (selectedFilters: ProductFilterDto) => {
    setFilters(selectedFilters);
    fetchProducts();
  };

  const handleOpenCreateModal = () => {
    setUpdating(false)
    setOpenModal(true)
  }

  const handleOpenUpdateModal = async (id: string) => {
    setUpdating(true)
    const response = await findProductById(id)
    if (response.success === true) {
      setId(response.data?.id)
      setName(response.data!.name)
      setDescription(response.data!.description)
      setSelected(response.data!.category)
      setCategory(response.data!.category)
      setBrand(response.data!.brand)
      setPrice(response.data!.price.toString())
      setQuantity(response.data!.quantity)
    }
    setOpenModal(true)
  }

  return (
    <div className={`gap-8 ${styles.container}`}>

      <div className="flex items-center mt-20">
        <button className="cursor-pointer mr-6 bg-black hover:bg-[#808080] text-white w-48 h-10 px-4 rounded-md"
          type="button" onClick={handleOpenCreateModal}>Add product</button>
        <SearchBar onSearch={handleSearch} keys={["name"]} data={products} />
        <div className="">
          <FilterModal
            onFilterChange={handleFilterChange} />
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-6">
        {products && products.map((product) => (
          <li key={product.id} className="transition-transform transform hover:scale-105">
            <Card className={`${styles.card} rounded-lg p-4`}>
              <div className="relative">
                <IoMdMore
                  className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200 outline-none"
                  fontSize={26}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Show more options"
                  onClick={() => setOpenOptions(product.id!)}
                />

                {openOptions === product.id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg"
                    onMouseLeave={() => setOpenOptions(null)}
                  >
                    <ul className="p-2 space-y-1">
                      <li
                        className="cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md transition duration-150"
                        onClick={() => deleteProduct(product.id!)}
                      >
                        Delete
                      </li>
                      <li
                        className="cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-md transition duration-150"
                        onClick={() => handleOpenUpdateModal(product.id!)}
                      >
                        Edit
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-3">
                <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                <p className="font-normal text-gray-600 text-sm">{product.description}</p>

                <div className="flex gap-4 justify-between items-center">
                  <p className="font-semibold text-gray-700">Brand: <span className="text-gray-500">{product.brand}</span></p>
                  <p className="font-semibold text-gray-700">Category: <span className="text-gray-500">{product.category}</span></p>
                </div>

                <div className="flex justify-between mt-2 items-center">
                  <p className="font-semibold text-lg text-black">Price: <span className="text-xl text-green-600">${product.price}</span></p>
                  <p className="font-semibold text-sm text-gray-500">Available: {product.quantity}</p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {
        openModal &&
        <Modal isModalOpen={openModal} closeModal={() => setOpenModal(false)}>
          <h2 className="text-center text-2xl font-bold mb-4">{updating ? "Update product" : "Add product"}</h2>
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
                type="button" onClick={updating ? editProduct : addProduct}>{updating ? "update" : "save"}</button>
            </div>
          </form>
        </Modal>
      }

      {products && (
        <button
          type="button"
          onClick={fetchProducts}
          disabled={isLoading}
          className="p-2 cursor-pointer rounded-full hover:bg-gray-300 transition duration-200"
        >
          <IoReload fontSize={24} color="#808080" className={`${isLoading ? "animate-spin" : ""}`} />
        </button>
      )}

      {
        showAlert && <Alert Close={() => setShowAlert(false)} title={title} type={type!}
          text={text} />
      }
    </div >
  );
}

export default Home;