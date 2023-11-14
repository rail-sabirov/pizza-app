import { ButtonHTMLAttributes, ReactNode } from 'react';

// Типизируем свойства компоненты. 
// Расширяем все атрибуты для кнопки. чтобы не описывать все самим
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	// Все вложенные компоненты будут типа ReactNode - теги, комопоненты и другие...
	children: ReactNode
}