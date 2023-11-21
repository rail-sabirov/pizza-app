import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling'
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';


export function Menu() {
    // Отслеживаение получение данных о продуктах, с типизацией
    const [products, setProducts] = useState<IProduct[]>([]);

    // Флаг окончания загрузки данных с сервера
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // Для работы с ошибками
    const [error, setError] = useState<string | undefined>();

    // Попучаем продукты с REST API - сервера
    const getMenu = async () => {
        // Получение данных через Axios
        try {
            // Используем дженерик для получения данных нужного типа
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);

            // Обновляем список продуктов, полученными данными
            setProducts(data);

            // Обновляем флаг, после окончания загрузки
            setIsLoaded(true);

        } catch(e) {
            console.log(e);

            // В этом блоке ошибка может быть связана с Axios
            if(e instanceof AxiosError) {
                setError(e.message);
            }

            setIsLoaded(false);
            
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
            { isLoaded && <MenuList products={products}/> }

            { !isLoaded && <>Loading products...</>}
            { error && <><br /><div style={{color: 'red'}}>{ error }</div></> }
          
          
        </div>
      </>
    );
}