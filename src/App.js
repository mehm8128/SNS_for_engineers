import "./App.css"
import Register from "./component/Register.js"
import Tweet from "./component/Tweet.js"
import TimeLine from "./component/TimeLine"

function App() {
	return (
		<div className="App">
			<Register />
			<Tweet />
			<TimeLine />
		</div>
	)
}

export default App
