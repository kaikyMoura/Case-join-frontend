import { BsBookshelf } from 'react-icons/bs';
import styles from './styles.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className='flex justify-center items-center gap-2'>
                <BsBookshelf className='mt-2' fontSize={28} color='black' />
                <h1 className='mt-3 text-2xl font-semibold'>Product Inventory</h1>
            </div>
        </header>
    )
}

export default Header;