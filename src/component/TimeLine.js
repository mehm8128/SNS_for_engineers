import React from "react"
import axios from "axios"
import "../css/TimeLine.css"

class TimeLine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tweets: [],
			usersId: [],
			tweetedUsersId: [],
			users: [],
			response: null,
		}
	}
	componentDidMount() {
		axios
			.get(
				`https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20`
			)
			.then((res) => {
				let list = this.state.tweets
				let list2 = this.state.tweetedUsersId
				for (let i = 0; i < 20; i++) {
					list = list.concat(res.data[i].text)
					list2 = list2.concat(res.data[i]._user_id)
				}
				this.setState({ tweets: list })
				this.setState({ tweetedUsersId: list2 })
			})
		axios.get(`https://versatileapi.herokuapp.com/api/user/all`).then((res) => {
			let list3 = this.state.usersId
			let list4 = this.state.users
			const len = res.data.length
			for (let i = 0; i < len; i++) {
				list3 = list3.concat(res.data[i]._user_id)
				list4 = list4.concat(res.data[i].name)
			}
			this.setState({ usersId: list3 })
			this.setState({ users: list4 })
		})
	}
	render() {
		const tweets = this.state.tweets
		const usersId = this.state.usersId
		const tweetedUsersId = this.state.tweetedUsersId
		const users = this.state.users
		const timeline = tweets.map((tweet, index) => {
			const name = users[usersId.indexOf(tweetedUsersId[index])]
			return (
				<div className="tweet">
					{name ? <li>{name}</li> : <li>名無しさん</li>}
					<li key={index} className="tweetContent">
						<p>{tweet}</p>
					</li>
				</div>
			)
		})
		return <ul className="timeLine">{timeline}</ul>
	}
}
export default TimeLine
