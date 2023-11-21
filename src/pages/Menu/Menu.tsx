import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling'
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import axios from 'axios';

export function Menu() {
    // Отслеживаение получение данных о продуктах, с типизацией
    const [product, setProducts] = useState<IProduct[]>([]);

    // Попучаем продукты с REST API - сервера
    const getMenu = async () => {
        // Получение данных через Axios
        try {
            // Используем дженерик для получения данных нужного типа
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);

            // Обновляем список продуктов, полученными данными
            setProducts(data);
        } catch(e) {
            console.log(e);
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