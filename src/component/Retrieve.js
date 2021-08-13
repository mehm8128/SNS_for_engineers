import React from "react"
import axios from "axios"
import "../css/Retrieve.css"

class Retrieve extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			retrievedValue: "",
			userList: [],
			userData: [],
			show: [],
		}
		this.handleRetrieveChange = this.handleRetrieveChange.bind(this)
		this.handleRetrieve = this.handleRetrieve.bind(this)
	}
	componentDidMount() {
		axios.get(`https://versatileapi.herokuapp.com/api/user/all`).then((res) => {
			let userList = this.state.userList
			const len = res.data.length
			for (let i = 0; i < len; i++) {
				userList = userList.concat(res.data[i].name)
			}
			this.setState({ userList: userList })
			this.setState({ userData: res.data })
		})
	}
	handleRetrieve(e) {
		e.preventDefault()
		const designatedUser = this.state.retrievedValue
		const userData = this.state.userData
		const userList = this.state.userList
		let show = [
			userData[userList.indexOf(designatedUser)].id,
			userData[userList.indexOf(designatedUser)].name,
			userData[userList.indexOf(designatedUser)].description,
		]
		this.setState({ show: show })
	}
	handleRetrieveChange(e) {
		this.setState({ retrievedValue: e.target.value })
	}
	render() {
		const flag = this.state.show
		return (
			<div className="retComp">
				<form onSubmit={this.handleRetrieve} className="retrieveForm">
					<label className="retrieveLabel">検索: </label>
					<input
						type="text"
						name="retrieve"
						value={this.state.retrievedValue}
						onChange={this.handleRetrieveChange}
						className="retrieveButton"
					/>
					<input type="submit" value="検索" className="retrieve" />
				</form>

				{flag[0] ? <p>ユーザー名:{this.state.show[1]}</p> : null}
				{flag[0] ? <p>自己紹介:{this.state.show[2]}</p> : null}
			</div>
		)
	}
}

export default Retrieve
