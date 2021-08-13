import "./App.css"
import Register from "./component/Register.js"
import Tweet from "./component/Tweet.js"
import TimeLine from "./component/TimeLine"
import Retrieve from "./component/Retrieve"

function App() {
	return (
		<div className="App">
			<div className="header">
				<Register classname="f-register" />
				<Tweet className="f-tweet" />
				<Retrieve className="f-retrieve" />
			</div>
			<TimeLine className="f-timeline" />
		</div>
	)
}

export default App
