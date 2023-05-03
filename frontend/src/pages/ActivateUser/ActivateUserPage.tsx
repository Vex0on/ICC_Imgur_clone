import { ActivateUser } from '../../components/ActivateUser/ActivateUser'

import styles from '../ResetPasswordConfirm/ResetPasswordConfirmPage.module.scss'

export const ActivateUserPage = () => {
    return(
        <main className={styles.main}>
            <h1 className={styles.main__header} >Aktywacja konta</h1>

            <p className={styles.main__text}> 
                Kliknij poniższy przycisk, aby aktywować swoje konto
            </p>

            <ActivateUser />

        </main>
    )
}