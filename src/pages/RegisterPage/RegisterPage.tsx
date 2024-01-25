import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './RegisterPage.module.css';
import { FormEvent, FormEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../store/store';
import { asyncRegisterUser, userActions } from '../../store/user.slice';


export type RegisterationForm = {
	name: { value: string };
	email: { value: string };
	password: { value: string };
};


export function RegisterPage() {
	const dispatch = useDispatch<AppDispatch>();
	const submit: FormEventHandler<HTMLFormElement> = async (event: FormEvent) => {
		event.preventDefault();

		dispatch(userActions.clearAuthErrorMessage());

		const data = event.currentTarget as typeof event.currentTarget & RegisterationForm;
		const { name, email, password } = data;

		// Регистрируемся, вызывая asyncRegisterUser
		dispatch(asyncRegisterUser({ name: name.value, email: email.value, password: password.value }));
	}

	// Получаем ошибку авторизации
	const { jwt, authErrorMessage } = useSelector((state: RootStore) => state.user);
	const navigate = useNavigate();

	// После регистрации мы получаем jwt-токен и переходимуем на главную страницу
	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	return (<div className={styles['register-container']}>
		<Headling>Registration</Headling>

		{authErrorMessage ? <div className={styles['error']}>{authErrorMessage}</div> : ''}

		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor='name'>Name</label>
				<Input name='name' type='text' id='name' placeholder='Name' />
			</div>

			<div className={styles['field']}>
				<label htmlFor='email'>Email</label>
				<Input name='email' type='email' id='email' placeholder='Email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor='password'>Password</label>
				<Input name='password' type='password' id='password' placeholder='Password' />
			</div>
			<Button type='submit' size='big'>Register</Button>
		</form>

		<div className={styles['footer']}>
			<div>Did you have an account?</div>
			<Link to='/auth/login'>Login</Link>
		</div>
	</div>);
}