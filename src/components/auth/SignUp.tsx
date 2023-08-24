import { useState } from "react";
import { auth } from "../../firebase";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const signUp = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				return;
			})
			.catch((error) => {
				alert(error);
			});
	};

	const googleSignUp = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const provider = await new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	return (
		<div className="sign-up-container">
			<form onSubmit={signUp}>
				<img
					src="../../img/lionlogo.png"
					width={"100px"}
					alt="logo of a lion"
				/>
				<h1>Create an Account</h1>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="password-container">
					<input
						className="password"
						type={showPassword ? "text" : "password"}
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						name="google-btn"
						type="button"
						className="toggle-password-button"
						onClick={toggleShowPassword}
					>
						{showPassword ? (
							<i className="fa-sharp fa-solid fa-eye eye"></i>
						) : (
							<i className="fa-solid fa-eye-slash eye"></i>
						)}
					</button>
				</div>
				<button className="submit-auth" type="submit">
					Sign Up
				</button>
			</form>
			<form onSubmit={googleSignUp}>
				<button className="google" type="submit">
					<i className="fa-brands fa-google"></i>
				</button>
			</form>
		</div>
	);
};

export default SignUp;
