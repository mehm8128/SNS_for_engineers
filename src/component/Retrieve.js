import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "../css/Retrieve.module.css"

function Retrieve() {
	const [retrievedValue, setRetrievedValue] = useState("")
	const [userList, setUserList] = useState([])
	const [userData, setUserData] = useState([])
	const [show, setShow] = useState([])

	useEffect(() => {
		axios.get(`https://versatileapi.herokuapp.com/api/user/all`).then((res) => {
			const len = res.data.length
			let userListCopy = userList
			for (let i = 0; i < len; i++) {
				userListCopy = userListCopy.concat(res.data[i].name)
			}
			setUserList(userListCopy)
			setUserData(res.data)
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	const handleRetrieve = (e) => {
		e.preventDefault()
		const designatedUser = retrievedValue
		let show = [
			userData[userList.indexOf(designatedUser)].name,
			userData[userList.indexOf(designatedUser)].description,
		]
		setShow(show)
	}
	const handleRetrieveChange = (e) => {
		setRetrievedValue(e.target.value)
	}
	return (
		<div className={styles.retComp}>
			<form onSubmit={handleRetrieve} className={styles.retrieveForm}>
				<label className={styles.retrieveLabel}>ユーザー名検索: </label>
				<input
					type="text"
					name="retrieve"
					value={retrievedValue}
					onChange={handleRetrieveChange}
					className={styles.retrieveForm}
				/>
				<br />
				<input type="submit" value="検索" className={styles.retrieveButton} />
			</form>

			{show[0] ? <p>ユーザー名:{show[1]}</p> : null}
			{show[0] ? <p>自己紹介:{show[2]}</p> : null}
		</div>
	)
}

export default Retrieve
