import cn from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.props';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({ isValid = true, className = '', ...props}: InputProps, ref) {
        return (
            <input 
                ref={ ref }
                className={ cn(
                    styles.input,
                    className, 
                    {
                        [styles['invalid']]: isValid
                    }
                )}
                { ...props } 
            />
        );
    }
)

export default Input;