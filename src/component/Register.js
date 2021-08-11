import React from "react"
import axios from "axios"
import "../css/Register.css"

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nameValue: "",
			introValue: "",
			userId: "",
		}

		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleIntroChange = this.handleIntroChange.bind(this)
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
	}
	handleRegisterSubmit(e) {
		e.preventDefault()
		if ((this.state.nameValue !== "") & (this.state.introValue !== "")) {
			const required = {
				name: this.state.nameValue,
				description: this.state.introValue,
			}
			axios
				.post(
					`https://versatileapi.herokuapp.com/api/user/create_user`,
					required
				)
				.then((res) => {
					this.setState({ userId: res.data.id })
				})
		}
		this.setState({ nameValue: "" })
		this.setState({ introValue: "" })
	}
	handleNameChange(e) {
		this.setState({ nameValue: e.target.value })
	}
	handleIntroChange(e) {
		this.setState({ introValue: e.target.value })
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.handleRegisterSubmit}
					className="registerSubmitForm"
				>
					<label className="nameLabel">
						名前:
						<input
							type="text"
							name="namePost"
							value={this.state.nameValue}
							onChange={this.handleNameChange}
						/>
					</label>
					<br />
					<label className="introLavel">
						自己紹介:
						<input
							type="text"
							name="introPost"
							value={this.state.introValue}
							onChange={this.handleIntroChange}
						/>
					</label>
					<input type="submit" value="登録" className="registerSubmit" />
				</form>
				{this.state.userId ? (
					<p>あなたのIDは{this.state.userId}です。</p>
				) : null}
			</div>
		)
	}
}
export default Register
