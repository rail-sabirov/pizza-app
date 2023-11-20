import { useParams } from 'react-router-dom';

function Product() {
    // Получаем параметр id из роута
    const { id } = useParams();

    return (<>
        Product Page, Product id: { id }
    </>);
}

export default Product;