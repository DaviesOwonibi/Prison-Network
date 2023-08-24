import { useEffect, useState } from "react";

const ThemeBtn = () => {
	const [theme, setTheme] = useState(true);
	const root = document.getElementById("body");

	useEffect(() => {
		// Check if theme preference is in localStorage
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme === "dark");
		} else {
			// Default theme if not set
			setTheme(true);
		}

		// Apply theme class to root element
		if (root) {
			if (theme) {
				root.classList.add("dark-mode");
				root.classList.remove("light-mode");
			} else {
				root.classList.add("light-mode");
				root.classList.remove("dark-mode");
			}
		}
	}, [root, theme]);

	function invertTheme() {
		const newTheme = !theme;
		setTheme(newTheme);

		// Update theme preference in localStorage
		localStorage.setItem("theme", newTheme ? "dark" : "light");
	}

	return (
		<div className="buttons">
			{!theme ? (
				<button
					name="dark-mode-btn"
					className="theme-btn"
					onClick={invertTheme}
				>
					<i className="fa-solid fa-moon"></i>
				</button>
			) : (
				<button
					name="light-mode-btn"
					className="theme-btn"
					onClick={invertTheme}
				>
					<i className="fa-solid fa-sun"></i>
				</button>
			)}
		</div>
	);
};

export default ThemeBtn;
