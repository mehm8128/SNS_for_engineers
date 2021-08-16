import { Link } from "react-router-dom"
import styles from "../css/ToRegister.module.css"

function ToRegister() {
	return (
		<div className={styles.link}>
			<Link to={"/register"} className={styles.linkContent}>
				ユーザー登録ページへ
			</Link>
		</div>
	)
}
export default ToRegister
