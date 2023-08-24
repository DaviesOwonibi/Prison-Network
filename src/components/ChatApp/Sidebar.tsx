import ChatList from "./ChatList";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeBtn from "./ThemeBtn";
import supabase from "../../supabase";

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

	useEffect(() => {
		async function fetchContacts() {
			const { data, error } = await supabase
				.from("friends") // Replace with your actual Supabase table name
				.select("name");

			if (error) {
				console.error("Error fetching contacts:", error.message);
			} else {
				const contactNames = data.map((contact) => contact.name);
				setItems(contactNames);
			}
		}

		fetchContacts();
	}, []);

	const filteredItems = useMemo(() => {
		return items.filter((item: string) => {
			return item.toLowerCase().includes(query.toLowerCase());
		});
	}, [items, query]);

	function addContact(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!inputRef.current) return;

		const value = inputRef.current.value;

		if (value === "") return;

		// Add the contact to Supabase
		async function insertContact() {
			const { data, error } = await supabase
				.from("friends") // Replace with your actual Supabase table name
				.insert([{ name: value }]);
			console.log(data);

			if (error) {
				console.error("Error inserting contact:", error.message);
			} else {
				setItems((prev) => [...prev, value]);
				if (inputRef.current != null) {
					inputRef.current.value = "";
				} else {
					return;
				}
			}
		}

		insertContact();
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
