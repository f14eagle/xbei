import React from 'react';
import formatUtil from 'lib/utils/formatUtil';

import actions from 'client/actions/Actions';

class CompareInput extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        content1: null,
        list1: [],
        sum1: 0,
        content2: null,
        list2: [],
        sum2: 0,
        diff: [],
      }

      this.onList1Changed = this.onList1Changed.bind(this);
      this.onList2Changed = this.onList2Changed.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  componentWillMount(){

  }

  componentDidMount(){
  }

  componentWillUpdate(){

  }

  componentDidUpdate(){
    /*let { actions, ownProps } = this.props;

    if(ownProps){
      let loginId;
      if(ownProps.match.url == '/'){
        loginId = 'dschulman';
      }else{
        loginId = ownProps.match.params.loginId;
      }
      actions.updateParamControl({
        loginId
      });
    }*/
  }

  onList1Changed(e){
    let val = e.target.value;
    this.setState({
      content1: val
    });

  }

  onList2Changed(e){
    let val = e.target.value;
    this.setState({
      content2: val
    });
  }

  convertToList(s){
    let res = new Array();
    if(s){
      var arr = s.split('\n');
      arr.map(o=>{
        var str = o.trim();
        if(str){
          res.push(str);
        }
      });
    }
    return res;
  }

  getSum(list){
    let res = 0;
    if(list){
      list.map(o=>{
        if(o && !isNaN(parseFloat(o)))
        {
          res += parseFloat(o);
        }
      });
    }
    return res;
  }

  onButtonClick(){
    let list1 = this.convertToList(this.state.content1);
    let sum1 = this.getSum(list1);
    let list2 = this.convertToList(this.state.content2);
    let sum2 = this.getSum(list2);

    let res = {};
    list1.map(o=>{
      if(o){
        let key = o + "_key";
        let tmp = res[key];
        if(!tmp){
          tmp = [o, 0];
          res[key] = tmp;
        }
        tmp[1] += 1;
      }
    });

    list2.map(o=>{
      if(o){
        let key = o + "_key";
        let tmp = res[key];
        if(!tmp){
          tmp = [o, 0];
          res[key] = tmp;
        }
        tmp[1] -= 1;
      }
    });

    this.setState({
      list1,
      sum1,
      list2,
      sum2,
      diff: res
    });
  }

  render(){
    let { state, actions } = this.props;

    //这部分从对应的 appleBasketReducer.js 中拷贝
    let mockState = {
      appState: {},
      orgState: {},
      paramState: {},
      ownProps: {},
    };

    let mockActions = {
    };

    return (
      <div>
        <div className="div-flex-container">
          <div className="div-flex-item">
            <textarea className="textarea-compare" onChange={this.onList1Changed}></textarea>
            <div className="div-flex-container">
              <div className="div-label">Total lines: {this.state.list1.length}</div>
              <div className="div-label">Total sum: {formatUtil.formatNumber(this.state.sum1, ',0.00')}</div>
            </div>
          </div>
          <div className="div-flex-item">
            <textarea className="textarea-compare" onChange={this.onList2Changed}></textarea>
            <div className="div-flex-container">
              <div className="div-label">Total lines: {this.state.list2.length}</div>
              <div className="div-label">Total sum: {formatUtil.formatNumber(this.state.sum2, ',0.00')}</div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-default" onClick={this.onButtonClick}>Find Difference</button>
        </div>
        <div className="div-flex-container">
          <div className="div-flex-item">
            {
              Object.keys(this.state.diff).map(key=>{
                var o = this.state.diff[key];
                if(o[1]>0){
                  return (
                    <div>
                      {o[0]} ({o[1]})
                    </div>
                  )
                }else{
                  return null;
                }
              })
            }
          </div>
          <div className="div-flex-item">
            {
              Object.keys(this.state.diff).map(key=>{
                var o = this.state.diff[key];
                if(o[1]<0){
                  return (
                    <div>
                      {o[0]} ({-o[1]})
                    </div>
                  )
                }else{
                  return null;
                }
              })
            }
          </div>
        </div>
      </div>

    );
  }

}

export default CompareInput;
