import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ChatApp from "./ChatApp/ChatApp";
import { RingLoader } from "react-spinners";
import ThemeBtn from "./ChatApp/ThemeBtn";

const AuthDetails = () => {
	const [loading, setLoading] = useState(false);
	const [authUser, setAuthUser] = useState<User | null>(null);
	const [hidden, setHidden] = useState(false);
	const [userEmail, setEmail] = useState("");
	const [photoPicURL, setPhotoPicURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setIsLoading(false);
			}, 3000);
		} else {
			return;
		}
	}, [isLoading]);

	const toggleHidden = () => {
		setHidden(!hidden);
	};

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
				if (user.photoURL) {
					setPhotoPicURL(user.photoURL);
				}
				if (user.email) {
					setEmail(user.email);
				}
			} else {
				setAuthUser(null);
			}
		});

		return () => {
			listen();
		};
	}, []);

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				return;
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<div>
			{authUser ? (
				<ChatApp
					profilePicture={photoPicURL}
					signOutFunc={userSignOut}
					email={userEmail}
				/>
			) : (
				<div className="cont">
					<div className="authentication">
						{hidden ? (
							<>
								{isLoading ? (
									<RingLoader
										loading={loading}
										size={100}
										color="#f0845a"
									/>
								) : (
									<>
										<SignIn />
										<a
											href="#"
											className="sign-up"
											onClick={toggleHidden}
										>
											Don't have an account? Sign up.
										</a>
									</>
								)}
							</>
						) : (
							<>
								<SignUp />
								<a
									href="#"
									className="sign-in"
									onClick={toggleHidden}
								>
									Already have an account? Log in.
								</a>
							</>
						)}
					</div>
					<ThemeBtn />
				</div>
			)}
		</div>
	);
};

export default AuthDetails;
