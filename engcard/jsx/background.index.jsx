'use strict';

const hists = [];
const handels = {};

/*var data = {
  'query': 'test',
  'translation': [
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错',
    '今天天气不错'
  ],
  'basic': {
    'phonetic': 'yahei, xx',
    'uk-phonetic': 'sss',
    'us-phonetic': 'fff',
    'explains': [
      'cc',
      'ss',
      'gg'
    ]
  },
  'web': [
    {key: 'xxx', value: ['tttt']},
    {key: 'xx阿斯x', value: ['ttt阿斯达斯的t']},
    {key: 'xxx', value: ['tttt', 'xxxxx']}
  ],
  'hists': [
    'xxxxx',
    'xxxxx',
    'xxxxx',
    'xxxxx'
  ]
};*/

/**
 * 封装jsonp请求
 */
function send(text, callback) {
  if(!text.trim()) return;

  // 压入历史记录
  addHist(text);

  text = encodeURIComponent(text);

  let script = document.createElement('script');
  script.src = `http://fanyi.youdao.com/openapi.do?keyfrom=engcard&key=1604033298&type=data&doctype=jsonp&callback=show&version=1.1&q=${text}`;

  script.onload = function(e) {
    // 加载成功
    script.parentNode.removeChild(script);
  };
  script.onerror = function(e) {
    // 加载失败
    script.parentNode.removeChild(script);
  };

  document.body.appendChild(script);
}

/**
 * jsonp数据返回
 */
function show(ret) {
  if(ret.errorCode) {
    // 异常
    dispatch('error', ret.errorCode);
  } else {
    ret.hists = hists;
    dispatch('success', ret);
  }
}

/**
 * 监听某个事件
 */
function listen(event, handel) {
  handels[event] = handels[event] || [];
  handels[event].push(handel);
}

/**
 * 触发某个事件
 */
function dispatch(event, data) {
  if(handels[event]) {
    handels[event].forEach((handel) => {
      handel(data);
    });
  }
}

/**
 * 增加历史记录
 */
function addHist(text) {
  text = text.trim();

  for(let i=hists.length-1; i>=0 ;i--) {
    if(hists[i] === text) hists.splice(i, 1);
  }

  while(hists.length >= 20) hists.unshift();
  hists.push(text);
}


/**
 * 输入框组件
 */
const Ipts = React.createClass({
  search: function() {
    let query = this.refs.searchIpt.value;
    send(query);
  },
  render: function() {
    return (
      <div className="ipt_box">
				<input className="ipt" type="text" ref="searchIpt" placeholder="请输入您要查询的单词或语句" />
				<button className="btn" type="button" onClick={this.search}><i className="icon-search"></i></button>
			</div>
    );
  }
});

/**
 * 翻译组件
 */
const Trans = React.createClass({
  render: function() {
    let translation = this.props.translation;
    return (
      <div className="trans_box">
      	{
      		translation.map((tran, index) => {
      			return (<div key={index} className={'trans trans_' + index%5}>{tran}</div>);
      		})
      	}
			</div>
    );
  }
});

/**
 * 释义组件
 */
const Exps = React.createClass({
  render: function() {
    let query = this.props.query;
    let phonetic = this.props.basic && this.props.basic.phonetic;
    let ukPhonetic = this.props.basic && this.props.basic['uk-phonetic'];
    let usPhonetic = this.props.basic && this.props.basic['us-phonetic'];
    let explains = this.props.basic && this.props.basic.explains || [];
    return (
      <div className="exps_box">
				<div className="query">{query}</div>
				{
					!phonetic && !ukPhonetic && !usPhonetic ? '' : 
						<div className="pron">
							{phonetic ? <div className="pron_item">[{phonetic}]</div> : ''}
							{ukPhonetic ? <div className="pron_item">英[{ukPhonetic}]</div> : ''}
							{usPhonetic ? <div className="pron_item">美[{tusPhonetic}]</div> : ''}
						</div>
				}
				<div className="exps_title">释义 :</div>
				{
					!explains.length ? '' :
						<ul className="exps">
							{
								explains.map((exp, index) => {
									return (<li key={index} className="exp">{exp}</li>);
								})
							}
						</ul>
				}
			</div>
    );
  }
});

/**
 * 网络释义组件
 */
const Nets = React.createClass({
  render: function() {
    let web = this.props.web;
    return (
      <div className="nets_box">
				<div className="nets_title">网络释义 :</div>
				<ul className="nets">
					{
						web.map((net, index) => {
							return (<li key={index} className="net"><span className="net_key">{net.key}</span>:<span className="net_val">{net.value.join(' , ')}</span></li>);
						})
					}
				</ul>
			</div>
    );
  }
});

/**
 * 历史记录组件
 */
const Hists = React.createClass({
  render: function() {
    let hists = this.props.hists;
    return (
      <div className="hists_box">
				<ul className="hists">
					{
						hists.map((hist, index) => {
							return (
								<li key={index} className="hist">
									<i className="icon-search"></i>
									<a href="#" title={hist}>{hist}</a>
								</li>
							);
						})
					}
				</ul>
			</div>
    );
  }
});

/**
 * 整体布局组件
 */
const Layouts = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    listen('success', (data) => {
      this.setState(data);
    });
  },
  render: function() {
    let {basic, web, hists, translation, query} = this.state;
    return (
    	<div>
	      <div className="top">
	      	<Ipts />
				</div>
				<div className="bottom">
					<div className="top_block_cnt">
						{translation && translation.length ? <Trans translation={translation} /> : ''}
					</div>
					<div className="bottom_block_cnt">
						<div className="left_cnt">
							{basic ? <Exps basic={basic} query={query} /> : ''}
							{web ? <Nets web={web} /> : ''}
						</div>
						<div className="right_cnt">
							{hists && hists.length ? <Hists hists={hists} /> : ''}
						</div>
					</div>
				</div>
			</div>
    );
  }
});

ReactDOM.render(
  <Layouts />,
  document.getElementById('cnt')
);