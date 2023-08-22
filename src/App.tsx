import { useState, useEffect } from 'react'
import "./App.css";
import AuthDetails from "./components/AuthDetails";
import RingLoader from "react-spinners/RingLoader";

function App() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [])
	return (
		<div className="App">
			{loading ? (
				<div className="loading-div">
					<RingLoader loading={loading} size={100} color="#f0845a" />
				</div>
			) : (
				<AuthDetails />
			)}
		</div>
	);
}

export default App;
