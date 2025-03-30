import { Category } from "@/types/CategoryEnum";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import styles from './styles.module.css';
import Modal from "../Modal";


const FilterModal = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<{ brand?: string, category?: string; minPrice?: number; maxPrice?: number }>({});

    const [openDropdown, setOpenDropdown] = useState(false);

    const handleFilterChange = (key: string, value: string | number) => {
        setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    };

    const removeFilter = (key: keyof typeof selectedFilters) => {
        setSelectedFilters((prev) => {
            const newFilters = { ...prev };
            delete newFilters[key];
            return newFilters;
        });
    };

    // Aplica os filtros
    const applyFilters = () => {
        setOpenFilterOptions(false);
        onFilterChange(selectedFilters);
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center gap-2">
                <IoFilter className={`absolute cursor-pointer -ml-6 z-100 outline-none ${styles.filterIcon}`} fontSize={26}
                    data-tooltip-id="my-tooltip" data-tooltip-content="Filter option"
                    onClick={() => setOpenFilterOptions(!openFilterOptions)}
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([key, value]) => (
                    <span
                        key={key}
                        className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap"
                    >
                        {key}: {value}
                        <AiOutlineClose
                            className="ml-2 cursor-pointer hover:text-red-400 transition-colors"
                            onClick={() => removeFilter(key as keyof typeof selectedFilters)}
                        />
                    </span>
                ))}
            </div>

            <Modal isModalOpen={openFilterOptions} closeModal={() => setOpenFilterOptions(false)}>
                {openFilterOptions && (
                    <>

                        <div className="flex flex-col">
                            <label className="text-sm font-normal">Category</label>
                            <button
                                type="button"
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className={`flex items-center justify-between cursor-pointer ${styles.modalInput}`}
                            >
                                {selectedFilters.category || "select a category"}
                                <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdown ? "rotate-90" : ""}`} fontSize={20} />
                            </button>
                            {openDropdown && (
                                <ul className={`${styles.options}`}>
                                    {Object.entries(Category).map(([key, value]) => (
                                        <li key={key} className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                handleFilterChange("category", value); (value);
                                                setOpenDropdown(false);
                                            }} >
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                placeholder="Brand"
                                onChange={(e) => handleFilterChange("brand", e.target.value)}
                                value={selectedFilters.brand || ""}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price Range:</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    className="w-1/2 border rounded p-2"
                                    placeholder="Min"
                                    onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                                    value={selectedFilters.minPrice || ""}
                                />
                                <input
                                    type="number"
                                    className="w-1/2 border rounded p-2"
                                    placeholder="Max"
                                    onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                                    value={selectedFilters.maxPrice || ""}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="cursor-pointer mt-4 w-full bg-[black] text-white py-2 rounded-md hover:bg-[#808080]"
                            onClick={applyFilters} >
                            Apply Filters
                        </button>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default FilterModal;