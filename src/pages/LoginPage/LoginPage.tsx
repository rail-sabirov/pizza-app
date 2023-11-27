import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import Headling from '../../components/Headling/Headling';
import { FormEvent, FormEventHandler, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';

// Тип для данных форм
export type LoginForm = {
	email: { value: string };
	password: { value: string };
};


export function LoginPage() {
	// Состояние для отслеживания ошибки
	const [error, setError] = useState<string | null>();

	// Функция для отправки логина и пароля через POST запрос 
	// и получение access_token от API сервера
	// -> (для теста a@gmail.com, 123)
	const sendLogin = async (email: string, password: string) => {
		try {
			// Ожидаем получение ответа
			const { data } = await axios.post(`${PREFIX}/auth/login`, {
				email,
				password
			});

			console.log('Receive data from server after send login credentials!');
			console.log(data);
		
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