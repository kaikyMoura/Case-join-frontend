import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import styles from './styles.module.css';

const SearchBar = <T extends Record<string, unknown>>({
    onSearch,
    keys,
    data,
}: {
    onSearch: (results: T[]) => void;
    keys: (keyof T)[];
    data: T[];
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filterData = useCallback(
        (query: string) =>
            data.filter((item) =>
                keys.some((key) =>
                    String(item[key]).toLowerCase().includes(query.toLowerCase())
                )
            ),
        [data, keys]
    );

    useEffect(() => {
        const filtered = filterData(searchQuery);
        onSearch(filtered);
    }, [searchQuery, filterData, onSearch]);

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="flex items-center relative w-full">
            <input
                className={styles.searchInput}
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
                <button
                    className="z-100 absolute left-64 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={clearSearch}
                >
                    <FaX fontSize={16} color="#808080" />
                </button>
            )}

            <FaSearch className="-ml-6 z-100" fontSize={16} color="#808080" />
        </div>
    );
};

export default SearchBar