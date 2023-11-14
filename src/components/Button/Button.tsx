import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';

// Параметры функции из описанного внешнего файла
function Button( { children, className, ...props }: ButtonProps ) {
	return (
		<button 
			className={cn(styles.button, styles.accent, className)}
			{ ...props }>
				{children}
		</button>
	);
}

export default Button;