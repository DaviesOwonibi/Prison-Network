import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import supabase from "../../supabase";

interface ChatSection {
	sender: string;
}

const ChatSection = (props: ChatSection) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<string[]>([]);
	const [isMine, setMine] = useState(false);

	useEffect(() => {
		async function fetchMessage() {
			const { data, error } = await supabase
				.from("messages")
				.select("content, sender, id");

			if (error) {
				console.error("Error fetching messages:", error.message);
			} else {
				const messageDetails = data.map((message) => message.content);
				// const messageId = data.map((message) => message.id);
				const messageSender = data.map((message) => message.sender);

				const isMine = messageSender.some(
					(sender) => sender === props.sender
				);
				setMine(isMine);

				setMessages(messageDetails);
			}
		}

		fetchMessage();
	}, [messages, props.sender]);

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
				.insert([{ content: value, sender: props.sender }]);
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
