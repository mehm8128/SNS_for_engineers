import React, { useState } from "react"
import axios from "axios"
import styles from "../css/Tweet.module.css"
import techChan from "../items/テックちゃん.png"

function Tweet() {
	const [tweetValue, setTweetValue] = useState("")
	const [count, setCount] = useState(0)

	const handleTweetSubmit = (e) => {
		e.preventDefault()
		if (tweetValue !== "") {
			const required = {
				text: tweetValue,
			}
			const config = {
				headers: {
					Authorization: "HelloWorld",
				},
			}
			axios.post(
				`https://versatileapi.herokuapp.com/api/text`,
				required,
				config
			)
		}
		setTweetValue("")
	}
	const handleTweetChange = (e) => {
		setTweetValue(e.target.value)
		setCount(e.target.value.length)
	}
	return (
		<div className={styles.tweComp}>
			<form onSubmit={handleTweetSubmit} className={styles.tweetSubmitForm}>
				<label className={styles.tweetLabel}>つぶやき: </label>
				<input
					type="text"
					name="tweetPost"
					value={tweetValue}
					onChange={handleTweetChange}
					className={styles.tweetForm}
				/>
				<br />
				<input type="submit" value="つぶやく" className={styles.tweetButton} />
			</form>
			{count <= 280 ? (
				<p>注意: 入力できるのは280字までです</p>
			) : (
				<p className={styles.alert}>280字を超えています</p>
			)}
			<div className={styles.images}>
				<img src={techChan} alt="テックちゃん" className={styles.techChan} />
				<img src={techChan} alt="テックちゃん" className={styles.techChan} />
				<img src={techChan} alt="テックちゃん" className={styles.techChan} />
				<img src={techChan} alt="テックちゃん" className={styles.techChan} />
				<img src={techChan} alt="テックちゃん" className={styles.techChan} />
			</div>
		</div>
	)
}
export default Tweet
