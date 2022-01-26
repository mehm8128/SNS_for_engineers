import "./App.css"
import Register from "./component/Register.js"
import Tweet from "./component/Tweet.js"
import TimeLine from "./component/TimeLine"
import Retrieve from "./component/Retrieve"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ToRegister from "./component/ToRegister"

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<ToRegister className="f-toRegister" />
						<div className="header">
							<Tweet className="f-tweet" />
							<Retrieve className="f-retrieve" />
						</div>
						<TimeLine className="f-timeline" />
					</Route>
					<Route exact path="/register">
						<Register className="f-register" />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
//あ
