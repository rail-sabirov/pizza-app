import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import Headling from '../../components/Headling/Headling';
import { FormEvent, FormEventHandler, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { ILoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

// Тип для данных форм
export type LoginForm = {
	email: { value: string };
	password: { value: string };
};


export function LoginPage() {
	// Состояние для отслеживания ошибки
	const [error, setError] = useState<string | null>();

	// Для перехода после авторизации на главную страницу
	const navigate = useNavigate();

	// Хранилище: вызываем хук для получения нашей dispatch функции, для работы
	const dispatch = useDispatch<AppDispatch>();

	// Функция для отправки логина и пароля через POST запрос 
	// и получение access_token от API сервера
	// -> (для теста a@gmail.com, 123)
	const sendLogin = async (email: string, password: string) => {
		try {
			// Ожидаем получение ответа, отвер в формате ILoginResponse
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});

			// Сохраняем полученный токен в localStorage
			localStorage.setItem('jwt', data.access_token);

			// Добавить в redux
			dispatch(userActions.addJwt(data.access_token));

			// Переходим на главную страницу
			navigate('/');
		
		} catch(err) {
			// Ошибка от Axios
			if (err instanceof AxiosError) {
				// можно так же получить response
				setError(err.response?.data.message);
			}

		}
	};

	// Функция для отработки onSubmit формы
	const submit: FormEventHandler<HTMLFormElement> = async (event: FormEvent) => {
		// Тормозим процесс отправки формы
		event.preventDefault();

		// Очищаем предыдущие ошибки
		setError(null);

		// Задаем union тип для 
		const target = event.target as typeof event.target & LoginForm;
		const { email, password } = target;

		// Логинимся
		await sendLogin(email.value, password.value);
	}

	return (<div className={ styles['login-container'] }>
		<Headling>Login</Headling>
		
		{ !!error ? <div className={styles['error']}>{ error }</div> :  '' }

		<form className={styles['form']} onSubmit={ submit }>
			<div className={styles['field']}>
				<label htmlFor='email'>Email</label>
				<Input name='email' type='email' id='email' placeholder='Email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor='password'>Password</label>
				<Input name='password' type='password' id='password' placeholder='Password'/>
			</div>
			<Button type='submit' size='big'>Login</Button>
		</form>
		
		<div className={ styles['footer'] }>
			<div>Don't have an account?</div>
			<Link to='/auth/register'>Register</Link>
		</div>
	</div>);
}