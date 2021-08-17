import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "../css/TimeLine.module.css"

function TimeLine() {
	const [tweets, setTweets] = useState([])
	const [usersId, setUsersId] = useState([])
	const [tweetedUsersId, setTweetedUsersId] = useState([])
	const [users, setUsers] = useState([])
	const [date, setDate] = useState([])
	useEffect(() => {
		axios
			.get(
				`https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20`
			)
			.then((res) => {
				let tweetsCopy = tweets
				let tweetedUsersIdCopy = tweetedUsersId
				let dateCopy = date
				const len = res.data.length
				for (let i = 0; i < len; i++) {
					tweetsCopy = tweetsCopy.concat(res.data[i].text)
					tweetedUsersIdCopy = tweetedUsersIdCopy.concat(res.data[i]._user_id)
					dateCopy = dateCopy.concat(res.data[i]._created_at)
				}
				for (let i = 0; i < len; i++) {
					let dateCopy1 = dateCopy[i].split("T")[0]
					let dateCopy2 = dateCopy[i].split("T")[1]
					dateCopy1 = dateCopy1.replace("-", "年")
					dateCopy1 = dateCopy1.replace("-", "月")
					dateCopy1 = dateCopy1 + "日"
					let hour = Number(dateCopy2.slice(0, 2)) + 9
					dateCopy2 = String(hour) + dateCopy2.slice(2)
					dateCopy2 = dateCopy2.replace(":", "時")
					dateCopy2 = dateCopy2.replace(":", "分")
					dateCopy2 = dateCopy2.split(".")[0] + "秒"
					dateCopy[i] = dateCopy1 + dateCopy2
				}
				setTweets(tweetsCopy)
				setTweetedUsersId(tweetedUsersIdCopy)
				setDate(dateCopy)
			})
		axios.get(`https://versatileapi.herokuapp.com/api/user/all`).then((res) => {
			const len = res.data.length
			let usersIdCopy = usersId
			let usersCopy = users
			for (let i = 0; i < len; i++) {
				usersIdCopy = usersIdCopy.concat(res.data[i]._user_id)
				usersCopy = usersCopy.concat(res.data[i].name)
			}
			setUsersId(usersIdCopy)
			setUsers(users)
		})
		console.log("axiosed")
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	const timeline = tweets.map((tweet, index) => {
		const name = users[usersId.indexOf(tweetedUsersId[index])]
		return (
			<div className={styles.tweet} key={index}>
				{name ? (
					<li className={styles.name}>{name}</li>
				) : (
					<li className={styles.name}>名無しさん</li>
				)}
				<li className={styles.tweetContent}>
					<p>{tweet}</p>
				</li>
				<li className={styles.date}>{date[index]}</li>
			</div>
		)
	})

	return (
		<div className={styles.tlComp}>
			<ul className={styles.timeLine}>{timeline}</ul>
			<div className={styles.c}>
				テックちゃんは東京工業大学のマスコットキャラクターです。
				<br />
				テックちゃんの著作権は工大祭実行委員会、及び原案者のヒダさんにあります。
			</div>
		</div>
	)
}
export default TimeLine
