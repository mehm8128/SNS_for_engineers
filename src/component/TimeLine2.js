import React, { useState, useEffect } from "react"
import axios from "axios"
import "../css/TimeLine.css"

const TimeLine2 = () => {
	const [tweets, setTweets] = useState([])
	const [tweetedUsersId, setTweetedUsersId] = useState([])
	const [usersId, setUsersId] = useState([])
	const [users, setUsers] = useState([])
	const [date, setDate] = useState([])
	useEffect(() => {
		axios
			.get(
				`https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20`
			)
			.then((res) => {
				for (let i = 0; i < 20; i++) {
					setTweets(tweets.concat(res.data[i].text))
					setTweetedUsersId(tweetedUsersId.concat(res.data[i]._user_id))
				}
			})
		axios.get(`https://versatileapi.herokuapp.com/api/user/all`).then((res) => {
			const len = res.data.length
			for (let i = 0; i < len; i++) {
				setUsersId(usersId.concat(res.data[i]._user_id))
				setUsers(users.concat(res.data[i].name))
			}
		})
		axios
			.get(
				`https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20`
			)
			.then((res) => {
				const len = res.data.length
				for (let i = 0; i < len; i++) {
					setDate(date.concat(res.data[i]._created_at))
				}
			})
	})
	const timeline = tweets.map((tweet, index) => {
		const name = users[usersId.indexOf(tweetedUsersId[index])]
		const dates = { date }[index]
		return (
			<div className="tweet" key={index}>
				{name ? (
					<li className="name">{name}</li>
				) : (
					<li className="name">名無しさん</li>
				)}
				<li>{dates}</li>
				<li className="tweetContent">
					<p>{tweet}</p>
				</li>
			</div>
		)
	})
	return <ul className="timeLine">{timeline}</ul>
}
export default TimeLine2
