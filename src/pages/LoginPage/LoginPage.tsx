import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import Headling from '../../components/Headling/Headling';
import { FormEvent, FormEventHandler } from 'react';

export function LoginPage() {
	const submit: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
		// Тормозим процесс отправки формы
		event.preventDefault();

		// Получаем данные из формы и проеобразуем в объект
		const data = new FormData(event.target as HTMLFormElement);
		console.log(Object.fromEntries(data));
	}

	return (<div className={ styles['login-container'] }>
		<Headling>Login</Headling>
		
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