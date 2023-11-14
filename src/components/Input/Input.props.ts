import { InputHTMLAttributes } from 'react';

// Описываем с помощью интерфейса компонент строки ввода
// Для описания используем расширение другим интерфейсом, потому что это все виртуальные react-компоненты 
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean;
}