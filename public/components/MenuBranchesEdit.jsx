import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import * as DomUtils from '../shared/dom.utils';

import MenuBranchEdit from './MenuBranchEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let onAdd = (obj) => {
		let branches;
		ctx.setState((prevState) => {
			branches = prevState.allBranches;

			let newBranch = (ctx.props.profile && ctx.props.profile.branches) ? ctx.props.profile.branches.find(branch => {
				return branch.BranchID === obj.id;
			}) : null;

			if (newBranch) {
				branches.push(newBranch);
			}

			if (ctx.props.onChange && typeof ctx.props.onChange === 'function') {
				ctx.props.onChange('branches', {data: branches});
			}

			return {
				allBranches: branches
			}
		});
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
	};

	let onRemove = (obj) => {
		console.log(obj);
		let branches;
		ctx.setState((prevState) => {
			branches = prevState.allBranches.reduce((acc, current) => {
				return (current.BranchID !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allBranches);

			console.log(branches);

			ctx.props.onChange('branches', {data: branches});

			return {
				allBranches: branches
			}
		});
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerItemClick = (e) => {
		// Change UI
		let rel = e.target.getAttribute('rel');
		let text = e.target.textContent;
		let id = parseInt(e.target.getAttribute('data-id'), 10);
		let target = e.target.parentNode.previousElementSibling;
		target.setAttribute('data-rel', rel);
		target.textContent = text;

		DomUtils.toggleClass(target, 'active');

		// Then add the new branch
		onAdd({
			id,
			rel,
			name: text
		});
	};

	return {
		onAdd,
		onPickerBlur,
		onRemove,
		onPickerClick,
		onPickerItemClick
	};
};

class MenuBranchesEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allBranches: []
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
        
    }

	render() {
		const { branches, onChange } = this.props;

		const availableBranches = (this.props.profile && this.props.profile.branches) ? this.props.profile.branches : [];

		console.log(branches);
		console.log(availableBranches);

		// List of all branches availables is to retrieved dynamically from db
		const obj = {
			type: "branches",
			items: availableBranches
		};

		const branchesComponent = (this.state.allBranches && this.state.allBranches.length > 0) ? this.state.allBranches.map((branch, index) => {
			return (index < this.state.allBranches.length - 1)
				? (
					<span key={branch.BranchID}>
						<MenuBranchEdit id={branch.BranchID} name={branch.Name} onRemove={this.handlers.onRemove} key={branch.BranchID} />
						,&nbsp;
					</span>
				) : (
					<span key={branch.BranchID}>
						<MenuBranchEdit id={branch.BranchID} name={branch.Name} onRemove={this.handlers.onRemove} key={branch.BranchID} />
					</span>
				)
		}) : null;

		return (
			<div>
				<p className="menu--title">Branches</p>
				{branchesComponent}

				<div id="menu-branch-add" className="language--add">
					<label>Add a branch for this menu:</label>
					<div id="branch-picker" className="language--picker">
						<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
                    </div>
				</div>
            </div>
		)
	}
};

MenuBranchesEdit.propTypes = {
	branches: PropTypes.array,
	onChange: PropTypes.func
};

const mapStateToProps = (state) => {
	console.log(state);
  return {
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(MenuBranchesEdit);