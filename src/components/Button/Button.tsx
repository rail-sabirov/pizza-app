import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';

// Параметры функции из описанного внешнего файла
function Button( { children, className, size = 'small', ...props }: ButtonProps ) {
	return (
		<button 
			className={
				cn(
					styles.button, 
					styles.accent, 
					className, 
					{[styles['big']]: size == 'big'}
				)}
			{ ...props }>
				{children}
		</button>
	);
}

export default Button;