import React, { Component, PropTypes } from 'react';

const classNames = require('classnames');

let createHandlers = (ctx) => {
	let onRemove = (obj, fn) => {
		ctx.setState({
			removed: true
		});
		// actually remove that thing from the global store
		if (typeof fn === 'function') {
			fn(obj);
		}
	};

	return {
		onRemove
	};
};

class BranchImageEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removed: false
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { id, newlyAdded, imgPath, caption, altDesc, onRemove } = this.props;

		const classes = classNames(
			(newlyAdded) ? 'image--new' : ''
		);

		return  (
			<li className={classes}>
				<div className="actions--overlay">
					<div className="header--actions">
						<ul>
							<li><div id={"delete-image-" + id} className="action action--delete" onClick={(e) => this.handlers.onRemove({id, imgPath, caption, altDesc}, onRemove)}>Delete</div></li>
						</ul>
					</div>
				</div>
				<div className="branch--image">
	                <img src={imgPath} alt={altDesc} />

	                {caption &&
	                    <p className="branch--image--caption">{caption}</p>
	                }
	            </div>
			</li>
		)
	}
};

BranchImageEdit.propTypes = {
	id: PropTypes.number,
	newlyAdded: PropTypes.bool,
	imgPath: PropTypes.string,
	caption: PropTypes.string,
	altDesc: PropTypes.string,
	onRemove: PropTypes.func
};

export default BranchImageEdit;