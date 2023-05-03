import { Link } from 'react-router-dom'

import { ResetPasswordSend } from '../../components/ResetPasswordSend/ResetPasswordSend'

import styles from '../ResetPasswordConfirm/ResetPasswordConfirmPage.module.scss'

export const ResetPasswordSendPage = () => {
    return(
        <main className={styles.main}>
            <h1 className={styles.main__header} >Zapomniałeś hasła?</h1>

            <p className={styles.main__text}> 
                Prosze podać swój adres e-mail używany podczas logowania się do serwisu i potwierdzić. Na podany adres zostanie wysłana wiadomość pozwalająca ustawić nowe hasło.
            </p>

            <ResetPasswordSend/>

            <Link to='/login'>
                <p className={styles.main__link}>Wróć do logowania</p>
            </Link>
        </main>
    )
}