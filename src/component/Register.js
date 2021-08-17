import React, { useState } from "react"
import axios from "axios"
import styles from "../css/Register.module.css"
import { Link } from "react-router-dom"

function Register() {
	const [nameValue, setNameValue] = useState("")
	const [introValue, setIntroValue] = useState("")

	const handleRegisterSubmit = (e) => {
		e.preventDefault()
		if ((nameValue !== "") & (introValue !== "")) {
			const required = {
				name: nameValue,
				description: introValue,
			}
			axios.post(
				`https://versatileapi.herokuapp.com/api/user/create_user`,
				required
			)
		}
		setNameValue("")
		setIntroValue("")
	}
	const handleNameChange = (e) => {
		setNameValue(e.target.value)
	}
	const handleIntroChange = (e) => {
		setIntroValue(e.target.value)
	}
	return (
		<div>
			<div className={styles.link}>
				<Link to={"/"} className={styles.linkContent}>
					トップページヘ
				</Link>
			</div>
			<div className={styles.regiComp}>
				<form
					onSubmit={handleRegisterSubmit}
					className={styles.registerSubmitForm}
				>
					<div className={styles.nameRegi}>
						<label className={styles.nameLabel}>名前: </label>
						<input
							type="text"
							name="namePost"
							value={nameValue}
							onChange={handleNameChange}
							className={styles.nameForm}
						/>
					</div>
					<br />
					<div className={styles.introRegi}>
						<label className={styles.introLabel}>自己紹介: </label>
						<input
							type="text"
							name="introPost"
							value={introValue}
							onChange={handleIntroChange}
							className={styles.introForm}
						/>
					</div>
					<br />
					<input type="submit" value="登録" className={styles.registerButton} />
				</form>
			</div>
			<div className={styles.alert}>
				{nameValue.length <= 30 ? (
					<p className={styles.name}>注意1: ユーザー名は30字までです</p>
				) : (
					<p className={styles.nameAlert}>ユーザー名が30字を超えています</p>
				)}
				{introValue.length <= 300 ? (
					<p className={styles.intro}>注意2: 自己紹介は300字までです</p>
				) : (
					<p className={styles.introAlert}>自己紹介が300字を超えています</p>
				)}
			</div>
		</div>
	)
}
export default Register
