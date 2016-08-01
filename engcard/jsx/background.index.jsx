/**
 * 输入框组件
 */
const Ipts = React.createClass({
  render: function() {
    return (
      <div className="ipt_box">
				<input className="ipt" type="text" placeholder="请输入您要查询的单词或语句" />
				<button className="btn" type="button"><i className="icon-search"></i></button>
			</div>
    );
  }
});

/**
 * 翻译组件
 */
const Trans = React.createClass({
	getInitialState: function() {
    return {trans: [
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错',
    	'今天天气不错'
    ]};
  },
  render: function() {
    return (
      <div className="trans_box">
      	{
      		this.state.trans.map((tran, index) => {
      			return (<div className={'trans trans_' + index}>{tran}</div>);
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
	getInitialState: function() {
    return {
    	query: 'test',
    	phonetic: 'yahei, xx',
    	ukPhonetic: 'sss',
    	usPhonetic: 'fff',
    	exps: [
    		'cc',
    		'ss',
    		'gg'
    	]
    };
  },
  render: function() {
    return (
      <div className="exps_box">
				<div className="query">{this.state.query}</div>
				{
					!this.state.phonetic && !this.state.ukPhonetic && !this.usPhonetic ? '' : 
						<div className="pron">
							{this.state.phonetic ? <div className="pron_item">[{this.state.phonetic}]</div> : ''}
							{this.state.ukPhonetic ? <div className="pron_item">英[{this.state.ukPhonetic}]</div> : ''}
							{this.state.usPhonetic ? <div className="pron_item">美[{this.state.usPhonetic}]</div> : ''}
						</div>
				}
				<div className="exps_title">释义 :</div>
				{
					!this.state.exps.length ? '' :
						<ul className="exps">
							{
								this.state.exps.map((exp) => {
									return (<li className="exp">{exp}</li>);
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
	getInitialState: function() {
    return {nets: [
    	{key: 'xxx', value: 'tttt'},
    	{key: 'xx阿斯x', value: 'ttt阿斯达斯的t'},
    	{key: 'xxx', value: 'tttt'}
    ]};
  },
  render: function() {
    return (
      <div className="nets_box">
				<div className="nets_title">网络释义 :</div>
				<ul className="nets">
					{
						this.state.nets.map((net) => {
							return (<li className="net"><span className="net_key">{net.key}</span>:<span className="net_val">{net.value}</span></li>);
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
	getInitialState: function() {
    return {hists: [
    	'xxxxx',
    	'xxxxx',
    	'xxxxx',
    	'xxxxx'
    ]};
  },
  render: function() {
    return (
      <div className="hists_box">
				<ul className="hists">
					{
						this.state.hists.map((hist) => {
							return (
								<li className="hist">
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

var data = {
	'query': 'test',
	'basic': {
		'phonetic': 'yahei, xx',
		'uk-phonetic': 'sss',
		'us-phonetic': 'fff',
  	'explains': [
  		'cc',
  		'ss',
  		'gg'
  	]
	}
};

/**
 * 整体布局组件
 */
const Layouts = React.createClass({
  render: function() {
    return (
    	<div>
	      <div className="top">
	      	<Ipts />
				</div>
				<div className="bottom">
					<div className="top_block_cnt">
						<Trans />
					</div>
					<div className="bottom_block_cnt">
						<div className="left_cnt">
							{data.basic ? <Exps basic={data.basic} /> : ''}
							<Nets />
						</div>
						<div className="right_cnt">
							<Hists />
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