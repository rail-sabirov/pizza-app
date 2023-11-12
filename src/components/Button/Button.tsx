import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import { FC } from 'react';

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