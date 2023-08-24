import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import supabase from "../../supabase";

const ChatSection = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<string[]>([]);
	const [isYours, setIsYours] = useState<boolean[]>([]);

	useEffect(() => {
		async function fetchMessage() {
			const { data, error } = await supabase
				.from("messages")
				.select("content, isYours");

			if (error) {
				console.error("Error fetching messages:", error.message);
			} else {
				const messageDetails = data.map((message) => message.content);
				const messageBool = data.map((message) => message.isYours);

				setMessages(messageDetails);
				if (messageBool.every((value) => typeof value === "boolean")) {
					setIsYours(messageBool);
				} else {
					console.error("Invalid messageBool values:", messageBool);
				}
			}
		}

		fetchMessage();
	}, [messages, isYours]);

	const isMine = isYours.every((value) => value === true);

	function makeMessage(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!inputRef.current) return;

		const value = inputRef.current.value;

		if (value === "") return;
		setMessages((prev) => [...prev, value]);

		inputRef.current.value = "";

		async function insertMessage() {
			const { data, error } = await supabase
				.from("messages")
				.insert([{ message: value, isYours: true }]);
			console.log(data);

			if (error) {
				console.error("Error inserting message:", error.message);
			} else {
				if (inputRef.current != null) {
					inputRef.current.value = "";
				} else {
					return;
				}
			}
		}

		insertMessage();
	}

	return (
		<div className="chat-section">
			<div className="chatArea">
				<Message items={messages} mine={isMine} />
			</div>
			<form onSubmit={makeMessage}>
				<input
					ref={inputRef}
					placeholder="Send a message..."
					type="text"
				/>
				<button>
					<i className="fa-solid fa-paper-plane"></i>
				</button>
			</form>
		</div>
	);
};

export default ChatSection;
