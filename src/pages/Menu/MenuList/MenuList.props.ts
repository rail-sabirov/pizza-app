import { IProduct } from '../../../interfaces/product.interface';

// Интерфейс типизирующий передаваемые параметры в комопнент
export interface MenuListProps {
    products: IProduct[];
}