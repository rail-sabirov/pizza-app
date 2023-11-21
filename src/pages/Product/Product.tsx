import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';

function Product() {
    // Получаем продукт из ReactRouter - loader
    const data = useLoaderData() as IProduct;

    return (<>
        <h1>Product: { data.name }</h1>
    </>);
}

export default Product;