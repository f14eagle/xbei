import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from 'client/actions/Actions';

import CompareInput from 'client/componenets/CompareInput';
//import ParamContainer from 'client/containers/ParamContainer';
//import OrgL1View from 'client/containers/OrgL1View';

class XbeiApp extends React.Component {

  constructor(props) {
      super(props);

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

  onButtonClick(){
    let { state, actions } = this.props;
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

    //是否开启模拟数据的开关，注释这行代码关闭模拟数据
    //state = mockState; actions = mockActions;

    return (
      <div className="container">
        <CompareInput />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  //console.log('map statue to props: ', state);
  return {

  };
};

const mapDispatchToProps = dispatch => {
  //console.log('map dispatch to props: ', dispatch);
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(XbeiApp));
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrgApp));
//export default OrgL1View;
