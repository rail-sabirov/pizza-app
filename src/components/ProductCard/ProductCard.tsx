import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

function ProductCard({ id, title, price, description, image, rating, ...props }: ProductCardProps) {
    const cardBackgroundStyle = {
        backgroundImage: `url('${image}')`
    };

    console.log(styles);
    return (<>
        <Link to='/' className={ styles['link'] }>
            <div {...props} className={cn(styles['product-card-container'])}>
                <div className={cn(styles['head'])} style={ cardBackgroundStyle }>
                    <div className={styles['price']}>&nbsp;
                        <span className={styles['currency']}>$</span>
                        {price}
                    </div>
                    <button className={styles['button']}>
                        <img src="/product-card/card-button-icon.svg" alt="Add to cart" />
                    </button>
                    <div className={styles['rating']}>
                        {rating}&nbsp;
                        <img src="/star-icon.svg" alt="Rating star icon" />
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['product-title']}>{title}</div>
                    <div className={styles['product-desc']}>{description}</div>
                </div>
            </div>
        </Link>
    </>);
}

export default ProductCard;