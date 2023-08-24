interface Props {
	items: string[];
	mine: boolean;
}

const Message = (props: Props) => {
	const mine = props.mine;
	return (
		<>
			{mine ? (
				<div className="mine messages my-messages">
					{props.items.map((item, index) => (
						<div key={index} className="message">
							{item}
						</div>
					))}
				</div>
			) : (
				<div className="yours messages">
					{props.items.map((item, index) => (
						<section key={index}>
							<div className="message">{item}</div>
						</section>
					))}
				</div>
			)}
		</>
	);
};

export default Message;
