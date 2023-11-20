import Headling from '../../components/Headling/Headling'
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import cn from 'classnames';

export function Menu() {
    return (
      <>
        <div className={cn(styles["header-container"])}>
          <Headling>Menu Page</Headling>
          <Search placeholder="Enter menu or composition" />
        </div>
        <div className={cn(styles['menu-page-container'])}>
          <ProductCard 
            id={1}
            title='Pizza Tasty, 200gr'
            description='Salami, rukkola, tomatos, olives'
            image='/product-card/product-image-01.png'
            rating={4.5}
            price={10}
          />
          <ProductCard 
            id={2}
            title='Pizza Tasty, 250gr'
            description='Salami, rukkola, tomatos, olives'
            image='/product-card/product-image-01.png'
            rating={4.3}
            price={12.5}
          />
          <ProductCard 
            id={3}
            title='Pizza Tasty, 300gr'
            description='Salami, rukkola, tomatos, olives'
            image='/product-card/product-image-01.png'
            rating={4.5}
            price={15}
          />
        </div>
      </>
    );
}