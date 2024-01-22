import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import Headling from '../../components/Headling/Headling';
import { FormEvent, FormEventHandler, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../store/store';
import { asyncLogin, userActions } from '../../store/user.slice';

// Тип для данных форм
export type LoginForm = {
	email: { value: string };
	password: { value: string };
};


export function LoginPage() {
	// Для перехода после авторизации на главную страницу
	const navigate = useNavigate();

	// Хранилище: вызываем хук для получения нашей dispatch функции, для работы
	const dispatch = useDispatch<AppDispatch>();

	// Хранилище: подписываемся на изменение jwt и ошибку авторизации
	const { jwt, loginErrorMessage } = useSelector((state: RootStore) => state.user);

	// Если jwt-токен есть, переходимуем на главную страницу
	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	// Функция для отправки логина и пароля через POST запрос 
	// и получение access_token от API сервера
	// -> (для теста API сервера: a@gmail.com, 123)
	const sendLogin = async (email: string, password: string) => {
		dispatch(asyncLogin({ email, password }));
	};

	// Функция для отработки onSubmit формы
	const submit: FormEventHandler<HTMLFormElement> = async (event: FormEvent) => {
		// Тормозим процесс отправки формы
		event.preventDefault();

		// Очищаем предыдущие ошибки
		dispatch(userActions.clearLoginErrorMessage());

		// Задаем union тип для 
		const target = event.target as typeof event.target & LoginForm;
		const { email, password } = target;

		// Логинимся
		await sendLogin(email.value, password.value);
	}

	return (<div className={styles['login-container']}>
		<Headling>Login</Headling>

		{!!loginErrorMessage ? <div className={styles['error']}>{loginErrorMessage}</div> : ''}

		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor='email'>Email</label>
				<Input name='email' type='email' id='email' placeholder='Email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor='password'>Password</label>
				<Input name='password' type='password' id='password' placeholder='Password' />
			</div>
			<Button type='submit' size='big'>Login</Button>
		</form>

		<div className={styles['footer']}>
			<div>Don't have an account?</div>
			<Link to='/auth/register'>Register</Link>
		</div>
	</div>);
}