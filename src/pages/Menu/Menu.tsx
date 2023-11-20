import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling'
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import cn from 'classnames';

export function Menu() {
    // Отслеживаение получение данных о продуктах, с типизацией
    const [product, setProducts] = useState<IProduct[]>([]);

    // Попучаем продукты с REST API - сервера
    const getMenu = async () => {
        try {
            const res = await fetch(`${PREFIX}/products`);

            // Проверим, если плохо, выходим
            if(!res.ok) {
                return;
            }

            // Получаем данные в формате json
            const data = await res.json() as IProduct[];

            // После получения данных обвновляем состояние массива продуктов
            setProducts(data);
        
        } catch(e) {
            console.error(e);

            return;
        }
    };

    // Загружаем продукты при переходе на страницу, одан раз
    useEffect(() => {
        getMenu();
    }, []);

    return (
      <>
        <div className={cn(styles["header-container"])}>
          <Headling>Menu Page</Headling>
          <Search placeholder="Enter menu or composition" />
        </div>

        <div className={cn(styles['menu-page-container'])}>
            { product.map(p => (
                <ProductCard 
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    ingredients={p.ingredients.join(', ')}
                    image={p.image}
                    rating={p.rating}
                    price={p.price}
                />
            )) }
          
          
        </div>
      </>
    );
}