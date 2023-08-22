import Sidebar from "./Sidebar";
import ChatSection from "./ChatSection";
interface Props {
	profilePicture: string;
	signOutFunc: () => void;
	email: string;
}

const ChatApp = (props: Props) => {
	
	return (
		<div className="chat-app">
			<Sidebar
				profilePic={props.profilePicture}
				signOut={props.signOutFunc}
				email={props.email}
			/>
			<ChatSection />
		</div>
	);
};

export default ChatApp;
