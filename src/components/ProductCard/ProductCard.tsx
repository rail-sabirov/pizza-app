import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

function ProductCard({ id, name, price, ingredients, image, rating, ...props }: ProductCardProps) {
    const cardBackgroundStyle = {
        backgroundImage: `url('${image}')`
    };

    console.log(styles);
    return (<>
        <Link to={`/product/${id}`} className={ styles['link'] }>
            <div {...props} className={cn(styles['product-card-container'])}>
                <div className={cn(styles['head'])} style={ cardBackgroundStyle }>
                    <div className={styles['price']}>
                        <span className={styles['currency']}>$</span>&nbsp;
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
                    <div className={styles['product-title']}>{name}</div>
                    <div className={styles['product-desc']}>{ingredients}</div>
                </div>
            </div>
        </Link>
    </>);
}

export default ProductCard;