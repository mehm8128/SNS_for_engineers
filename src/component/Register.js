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
			<div className="regiComp">
				<form
					onSubmit={this.handleRegisterSubmit}
					className="registerSubmitForm"
				>
					<div className="nameRegi">
						<label className="nameLabel">名前: </label>
						<input
							type="text"
							name="namePost"
							value={this.state.nameValue}
							onChange={this.handleNameChange}
							className="nameForm"
						/>
					</div>
					<br />
					<div className="introRegi">
						<label className="introLabel">自己紹介: </label>
						<input
							type="text"
							name="introPost"
							value={this.state.introValue}
							onChange={this.handleIntroChange}
							className="introForm"
						/>
					</div>
					<br />
					<input type="submit" value="登録" className="registerButton" />
				</form>
			</div>
		)
	}
}
export default Register
