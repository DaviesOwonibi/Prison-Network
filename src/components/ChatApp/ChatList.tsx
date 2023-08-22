interface Props {
	item: string[];
}

const ChatList = (props: Props) => {
	return (
		<div className="chat-list">
			{props.item.map((item, index) => (
				<section key={index}>
					<div className="friend-pic-container">
						<img
							className="friend-pic"
							src="https://images.unsplash.com/photo-1505533321630-975218a5f66f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
							alt=""
						/>
					</div>
					<div className="friend-text-container">
						<h1 className="name">{item}</h1>
						<div>
							<h2>Lorem Ipsum sdfmdndfjdfjdfjjdfjdfjdfggg</h2>
						</div>
					</div>
				</section>
			))}
		</div>
	);
};

export default ChatList;
