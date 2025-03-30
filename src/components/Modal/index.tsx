import styles from './styles.module.css'

const Modal = ({id, className, isModalOpen, closeModal, children}: {
    id?: string
    className?: string
    isModalOpen: boolean
    closeModal: () => void
    children: React.ReactNode
}) => {

    return (
        <>
            {isModalOpen &&
                (<div className={styles.modalContainer} onClick={closeModal}>
                    <div className={`${styles.modal} ${className} flex flex-col`} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
                )}
        </>
    )
}

export default Modal;