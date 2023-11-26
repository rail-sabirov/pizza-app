import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';

function Product() {
    // Новый Тип - это Объект { со свойством data, где data имеет тип IProduct }
    // Это описание получаемого с помощью useLoaderData загруженного из API объекта
    type ProductDataType = { 
        data: IProduct 
    };

    // Получаем продукт из ReactRouter - loader
    // его конкретное свойство data
    const productData = useLoaderData() as ProductDataType;

    // Не ждем загрузки данных, продолжаем рендерить страницу 
    // изза Syspense/заглушки и Await - ожидающего загрузку
    return (
      <>
        <Suspense fallback={"Loading..."}>
          <Await resolve={ productData.data }>
            {
              // Получаем данные типа { data: IProduct } и переименовывем их в product
              ({ data: product }: ProductDataType) => (
                <>
                  <h1>Product: { product.name }</h1>
                </>
              )
            }
          </Await>
        </Suspense>
      </>
    );
}

export default Product;