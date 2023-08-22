interface Props {
	item: string[];
	mine: boolean;
}

const Message = (props: Props) => {
	const mine = props.mine;
	return (
		<>
			{mine ? (
				<div className="mine messages my-messages">
					{props.item.map((item) => (
						<div className="message">{item}</div>
					))}
				</div>
			) : (
				<div className="yours messages">
					{props.item.map((item, index) => (
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
