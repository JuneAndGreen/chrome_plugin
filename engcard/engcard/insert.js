'use strict';

(function() {
	let card;
	let clickIsFromCard = false; // 点击事件是否来自卡片
	const codeMap = {
		[20]: '要翻译的文本过长',
		[30]: '无法进行有效的翻译',
		[40]: '不支持的语言类型',
		[50]: '无效的key',
		[60]: '无词典结果'
	};

	/**
	 * 封装ajax请求
	 */
	let send = function(text, callback) {
		text = encodeURIComponent(text);

		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(evt) {
			if(xhr.readyState==4 && xhr.status==200) {
				let result = xhr.responseText;

				try {
					result = JSON.parse(result);
				} catch(err) {
					result = {};
				}
				callback(result);
			}
		};
		xhr.open('GET', `https://fanyi.youdao.com/openapi.do?keyfrom=engcard&key=1604033298&type=data&doctype=json&version=1.1&q=${text}`);
		xhr.send();
	};

	/*
	 * 构建内容
	 */
	let constuctContent = function(data) {
		if(data.errorCode && codeMap[data.errorCode]) {
			// 请求有异常
			return codeMap[data.errorCode];
		} else {
			let fragment = document.createDocumentFragment();

			// 有道翻译
			let translations = data.translation || [];
			for(let i=0,len=translations.length; i<len; i++) {
				let translation = translations[i];
				let div = document.createElement('div');
				div.className = `engcard_translation engcard_translation_${i%5}`;
				div.innerText = translation;

				fragment.appendChild(div);
			}

			// 有道词典
			let basic = data.basic;
			if(basic) {
				let div = document.createElement('div');
				div.className = 'engcard_basic';

				let phonetic = basic.phonetic ? `<div class="engcard_basic_phonetic_tip">[${basic.phonetic}]</div>` : '';
				let ukPhonetic = basic['uk-phonetic'] ? `<div class="engcard_basic_phonetic_tip">英:[${basic['uk-phonetic']}]</div>` : ''; // 英式发音
				let usPhonetic = basic['us-phonetic'] ? `<div class="engcard_basic_phonetic_tip">美:[${basic['us-phonetic']}]</div>` : ''; // 美式发音

				let explains = (basic.explains || []).map((item) => {
					return `<div class="engcard_basic_explain">${item}</div>`;
				}).join('');

				let html = `<div>
					<div class="engcard_basic_query">${data.query}</div>
					<div class="engcard_basic_phonetic">
						${phonetic}
						${ukPhonetic}
						${usPhonetic}
					</div>
					<div class="engcard_basic_title">释义 :</div>
					${explains}
				</div>`;

				div.innerHTML = html;
				fragment.appendChild(div);
			}

			// 网络释义
			let webs = data.web || [];
			if(webs.length) {
				let div = document.createElement('div');
				div.className = 'engcard_web';

				// 提示语
				let title = document.createElement('div');
				title.className = 'engcard_web_title';
				title.innerText = '网络释义 : ';
				div.appendChild(title);

				// 列表
				let ul = document.createElement('ul');
				ul.className = 'engcard_web_ul';
				div.appendChild(ul);

				for(let web of webs) {
					ul.innerHTML += `<li>
						<span class="engcard_web_key">${web.key} : </span>
						<span>${(web.value||[]).join(' , ')}</span>
					</li>`;
				}

				fragment.appendChild(div);
			}

			return fragment;
		}
	};

	/*
	 * 获取对应卡牌的dom
	 */
	let getCard = function(content) {
		let card = document.createElement('div');
		card.className = 'engcard';
		
		if(typeof content === 'string') {
			// 文本
			card.innerText = content;
		} else {
			// 节点
			card.appendChild(content);
		}

		document.body.appendChild(card);

		card.addEventListener('mousedown', (evt) => {
			clickIsFromCard = true;
		});

		return card;
	};

	/*
	 * 获取显示坐标
	 */
	let getPosition = function(evt, card) {
		let mx = evt.pageX;
		let my = evt.pageY;

		let cw = card.clientWidth;
		let ch = card.clientHeight;

		// 默认在选中文字上方25px
		let x = mx - cw/2;
		let y = my - ch - 25;

		// 位置调整
		x = x < 0 ? 5 : x;
		y = y < 0 ? my + 25 : y;

		return {x, y};
	};

	/*
	 * 插入卡片
	 */
	let insertCard = function(evt, data) {
		let card = getCard(constuctContent(data));
		let position = getPosition(evt, card);

		card.style.left = `${position.x}px`;
		card.style.top = `${position.y}px`;

		return card;
	};

	document.addEventListener('mouseup', (evt) => {
		let text = document.getSelection().toString();
		if(text && evt.ctrlKey) {
			// 请求有道翻译
			send(text, (data) => {
				card = insertCard(evt, data); // 插入卡片
			});
		}
	});

	document.addEventListener('mousedown', (evt) => {
		// 移除卡片
		if(!clickIsFromCard && card) {
			document.body.removeChild(card);
			card = undefined;
		}

		clickIsFromCard = false;
	});

})();