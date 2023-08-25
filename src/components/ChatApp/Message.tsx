interface Props {
	items: string[];
	mine: boolean;
}

const Message = (props: Props) => {
	const messageClassName = props.mine
		? "mine messages my-messages"
		: "yours messages";

	return (
		<div className={messageClassName}>
			{props.items.map((item, index) => (
				<div key={index} className="message">
					{item}
				</div>
			))}
		</div>
	);
};

export default Message;
