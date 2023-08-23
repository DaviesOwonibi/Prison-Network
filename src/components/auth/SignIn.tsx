import { useState } from "react";
import { auth } from "../../firebase";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const googleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const provider = await new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const signIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				return;
			})
			.catch((error) => {
				alert(error);
			});
	};
	return (
		<div>
			<form onSubmit={signIn}>
				<img
					src="../../img/lionlogo.png"
					width={"100px"}
					alt="logo of a lion"
				/>
				<h1>Log In</h1>
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
					Log In
				</button>
			</form>
			<form onSubmit={googleSignIn}>
				<button className="google" type="submit">
					<i className="fa-brands fa-google"></i>
				</button>
			</form>
		</div>
	);
};

export default SignIn;
