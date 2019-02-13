import React, { Component, PropTypes } from 'react';

import * as DomUtils from '../shared/dom.utils';

import BranchLanguageEdit from './BranchLanguageEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let onAdd = (obj) => {
		ctx.setState((prevState) => {
			console.log(obj);
			let languages = prevState.allLanguages;

			let newLang = ctx.props.availableLanguages.find(lang => {
				return lang.LanguageID === obj.id;
			});

			if (newLang) {
				languages.push(newLang);
			}

			if (ctx.props.onChange && typeof ctx.props.onChange === 'function') {
				ctx.props.onChange('languages', {data: languages});
			}

			return {
				allLanguages: languages
			}
		});

	};

	let onRemove = (obj) => {
		ctx.setState((prevState) => {
			let languages = prevState.allLanguages.reduce((acc, current) => {
				return (current.id !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allLanguages);

			console.log(languages);

			ctx.props.onChange('languages', {data: languages});

			return {
				allLanguages: languages
			}
		});
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
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

		// Then add the new language
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

class LanguagesEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allLanguages: []
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { languages, availableLanguages, onChange } = this.props;

		console.log(languages);
		console.log(availableLanguages);

		const obj = {
			type: "languages",
			items: availableLanguages
		};

		console.log(this.state);

		const languagesComponent = (this.state.allLanguages && this.state.allLanguages.length > 0) ? this.state.allLanguages.map((lang, index) => {
			return (index < this.state.allLanguages.length - 1)
				? (
					<span key={index}>
						<BranchLanguageEdit id={lang.LanguageID} code={lang.Code} codeFull={lang.CodeFull} name={lang.Name} title={lang.Title} onRemove={this.handlers.onRemove} key={index} />
						,&nbsp;
					</span>
				) : (
					<span key={index}>
						<BranchLanguageEdit id={lang.LanguageID} code={lang.Code} codeFull={lang.CodeFull} name={lang.Name} title={lang.Title} onRemove={this.handlers.onRemove} key={index} />
					</span>
				)
		}) : null;

		return (
			<div>
				{languagesComponent}

				<div id="language-add" className="language--add">
					<label>Add a Language:</label>
					<div id="language-picker" className="language--picker">
						<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
                    </div>
				</div>
			</div>
		)
	}
};

LanguagesEdit.propTypes = {
	languages: PropTypes.array,
	availableLanguages: PropTypes.array,
	onChange: PropTypes.func
};

export default LanguagesEdit;