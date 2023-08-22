import { useRef, useState } from "react";
import Message from "./Message";

const ChatSection = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<string[]>([]);

	function makeMessage(e: React.FormEvent<HTMLFormElement>) {
		// Change parameter type
		e.preventDefault();

		if (!inputRef.current) return; // Check if inputRef is null

		const value = inputRef.current.value;

		if (value === "") return;
		setMessages((prev) => [...prev, value]);
		inputRef.current.value = "";
	}

	return (
		<div className="chat-section">
			<div className="chatArea">
				<Message item={messages} mine={true} />
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
