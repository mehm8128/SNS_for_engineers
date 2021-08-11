import React from "react"
import axios from "axios"
import "../css/Tweet.css"

class Tweet extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tweetValue: "",
			tweetId: "",
		}

		this.handleTweetChange = this.handleTweetChange.bind(this)
		this.handleTweetSubmit = this.handleTweetSubmit.bind(this)
	}
	handleTweetSubmit(e) {
		e.preventDefault()
		if (this.state.tweetValue !== "") {
			const required = {
				text: this.state.tweetValue,
			}
			const config = {
				headers: {
					Authorization: "HelloWorld",
				},
			}
			axios
				.post(`https://versatileapi.herokuapp.com/api/text`, required, config)
				.then((res) => {
					this.setState({ tweetId: res.data.id })
				})
		}
		this.setState({ tweetValue: "" })
	}
	handleTweetChange(e) {
		this.setState({ tweetValue: e.target.value })
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleTweetSubmit} className="tweetSubmitForm">
					<label className="tweetLabel">
						つぶやき:
						<input
							type="text"
							name="tweetPost"
							value={this.state.tweetValue}
							onChange={this.handleTweetChange}
						/>
					</label>
					<input type="submit" value="つぶやく" className="tweetSubmit" />
				</form>
			</div>
		)
	}
}
export default Tweet
