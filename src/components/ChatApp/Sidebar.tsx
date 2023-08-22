import ChatList from "./ChatList";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { useMemo, useRef, useState } from "react";
import ThemeBtn from "./ThemeBtn";

interface Props {
	profilePic: string;
	email: string;
	signOut: () => void;
}

const Sidebar = (props: Props) => {
	const avatar = createAvatar(thumbs, {
		seed: props.email,
	}).toDataUriSync();

	const svg = avatar.toString();
	const [items, setItems] = useState<string[]>([]); // Specify the type for 'items'
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null); // Specify the type for 'inputRef'

	const filteredItems = useMemo(() => {
		return items.filter((item: string) => {
			return item.toLowerCase().includes(query.toLowerCase());
		});
	}, [items, query]);

	function addContact(e: React.FormEvent<HTMLFormElement>) {
		// Change parameter type
		e.preventDefault();

		if (!inputRef.current) return; // Check if inputRef is null

		const value = inputRef.current.value;

		if (value === "") return;
		setItems((prev) => [...prev, value]);
		inputRef.current.value = "";
	}

	return (
		<div className="sidebar">
			<div className="top-part">
				{props.profilePic ? (
					<img
						src={props.profilePic}
						alt="pfp"
						className="profile-pic"
					/>
				) : (
					<img src={svg} alt="avatar" className="profile-pic" />
				)}
				<div className="buttons">
					<button className="sign-out" onClick={props.signOut}>
						<i className="fa-solid fa-arrow-up-from-bracket fa-rotate-270" />
					</button>
					<ThemeBtn />
				</div>
			</div>
			<div className="bottom-part">
				<input
					id="search-box"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					type="search"
					placeholder="Search for a contact"
				/>
				<form onSubmit={addContact}>
					<input
						className="friend-bar"
						ref={inputRef}
						placeholder="Add a new contact"
						type="text"
					/>
					<button className="search-btn" type="submit">
						<i className="fa-solid fa-person-circle-plus person"></i>
					</button>
				</form>
				<ChatList item={filteredItems} />
			</div>
		</div>
	);
};

export default Sidebar;
