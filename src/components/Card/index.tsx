import styles from './styles.module.css';

const Card = ({ children, className, title }: {
    children: React.ReactNode,
    className?: string,
    title?: string;
}) => {

    return (
        <>
            <div className={`${styles.cardContainer} ${className}`}>
                <div className={`${className}`}>
                    <h2 className="font-medium text-xl">{title}</h2>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Card;