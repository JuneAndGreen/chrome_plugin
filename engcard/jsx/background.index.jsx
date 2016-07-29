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
  render: function() {
    return (
      <div className="trans_box">
				<div className="trans trans_0">今天天气不错</div>
				<div className="trans trans_1">今天天气不错</div>
				<div className="trans trans_2">今天天气不错</div>
				<div className="trans trans_3">今天天气不错</div>
				<div className="trans trans_4">今天天气不错</div>
				<div className="trans trans_0">今天天气不错</div>
				<div className="trans trans_1">今天天气不错</div>
				<div className="trans trans_2">今天天气不错</div>
				<div className="trans trans_3">今天天气不错</div>
				<div className="trans trans_4">今天天气不错</div>
			</div>
    );
  }
});

/**
 * 释义组件
 */
const Exps = React.createClass({
  render: function() {
    return (
      <div className="exps_box">
				<div className="query">test</div>
				<div className="pron">
					<div className="pron_item">[yahei, xx]</div>
					<div className="pron_item">英[sss]</div>
					<div className="pron_item">美[fff]</div>
				</div>
				<div className="exps_title">释义 :</div>
				<ul className="exps">
					<li className="exp">cc</li>
					<li className="exp">ss</li>
					<li className="exp">ggg</li>
				</ul>
			</div>
    );
  }
});

/**
 * 网络释义组件
 */
const Nets = React.createClass({
  render: function() {
    return (
      <div className="nets_box">
				<div className="nets_title">网络释义 :</div>
				<ul className="nets">
					<li className="net"><span className="net_key">xxx</span>:<span className="net_val">tttt</span></li>
					<li className="net"><span className="net_key">xx阿斯x</span>:<span className="net_val">ttt阿斯达斯的t</span></li>
					<li className="net"><span className="net_key">xxx</span>:<span className="net_val">tttt</span></li>
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
    return (
      <div className="hists_box">
				<ul className="hists">
					<li className="hist">
						<i className="icon-search"></i>
						<a href="#" title="xxxxxxx">xxxxx</a>
					</li>
					<li className="hist">
						<i className="icon-search"></i>
						<a href="#" title="xxxxxxx">xxxxx</a>
					</li>
					<li className="hist">
						<i className="icon-search"></i>
						<a href="#" title="xxxxxxx">xxxxx</a>
					</li>
					<li className="hist">
						<i className="icon-search"></i>
						<a href="#" title="xxxxxxx">xxxxx</a>
					</li>
				</ul>
			</div>
    );
  }
});

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
							<Exps />
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