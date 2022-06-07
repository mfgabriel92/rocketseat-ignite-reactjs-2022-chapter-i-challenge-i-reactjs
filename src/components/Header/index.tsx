import styles from './Header.module.scss'
import todoLogoImg from '../../assets/todo-logo.svg'

function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogoImg} alt="Todo Logo" />
    </header>
  )
}

export { Header }