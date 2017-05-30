import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

//这是名空间，对普通action做划分
const prefix = 'xbei/';

promise.polyfill();

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = response => {
    return response.json();
}

let actions = {

    showLoadingPanel: () => ({
        type: 'myorg/UPDATE_LOADING_PANEL',
        payload: true,
    }),

    hideLoadingPanel: () => ({
        type: 'myorg/UPDATE_LOADING_PANEL',
        payload: false,
    }),

    /**
     * Redirect to user's l1 summary view
     *
     * @param  {[type]} loginId [description]
     * @return {[type]}         [description]
     */
    viewL1SummaryData: (loginId) => (dispatch, getState) => {
      if(loginId){
        let url = '/orgchart/' + loginId;
        //history.push(url);
        //let state = getState();
        //state.OrgReducer = state.OrgReducer.updateIn(['l1OrgView', 'orgLoginId'], ()=>loginId);
        dispatch(push(url));
      }
    },

    //注意这里需要 () => ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk
    loadL1SummaryData: (loginId) => (dispatch, getState) => {
        if(loginId){
          dispatch(actions.updateOrgLeaderLoginId(loginId));
        }

        var state = getState().OrgReducer;
        var orgLoginId = state.l1OrgView.orgLoginId;

        dispatch(actions.showLoadingPanel());
        //通知开始摘苹果
        dispatch(actions.beginLoadL1SummaryData());

        //发送摘苹果请求
        fetch('/api/myorg/queryL1OrgSummaryData/' + orgLoginId, {
            method: 'GET',
            headers: {
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            },
            credentials: 'same-origin'
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(res => {
            if(res.data){
                dispatch(actions.doneLoadL1SummaryData(res.data));
            }else{
                throw 'Invalid result!';
            }
        })
        .then( () => {
            //Load org leader user profile when l1 summary data is loaded
            actions.loadOrgLeaderInfo()(dispatch, getState);
        })
        .catch(err => {
            console.log(err);
            dispatch(actions.failPickApple(err));
        })
        .then( () => {
          dispatch(actions.hideLoadingPanel());
        });
    },

    updateOrgLeaderLoginId: (loginId) => ({
        type: 'myorg/UPDATE_ORG_LEADER_LOGINID',
        payload: loginId
    }),

    beginLoadL1SummaryData: () => ({
        type: 'myorg/BEGIN_LOAD_L1_SUMMARY_DATA'
    }),

    doneLoadL1SummaryData: data => ({
        type: 'myorg/DONE_LOAD_L1_SUMMARY_DATA',
        payload: data
    }),

    loadOrgLeaderInfo: () => (dispatch, getState) => {
        var state = getState().OrgReducer;
        var orgLoginId = state.l1OrgView.orgLoginId;

        fetch('/api/myorg/getPeopleDetailInfo/' + orgLoginId, {
            method: 'GET',
            headers: {
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            },
            credentials: 'same-origin'
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(res => {
            if(res.data){
                dispatch(actions.doneLoadOrgLeaderInfo(res.data));
            }else{
                throw 'Invalid result!';
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(actions.failPickApple(err));
        });
    },

    doneLoadOrgLeaderInfo: data => ({
        type: 'myorg/DONE_LOAD_ORG_LEADER_DATA',
        payload: data
    }),

    failPickApple: errMsg => ({
        type: 'apple/FAIL_PICK_APPLE',
        payload: new Error(errMsg),
        error: true
    }),

    eatApple: appleId => ({
        type: 'apple/EAT_APPLE',
        payload: appleId
    }),

    loadUserInfo: () => (dispatch, getState) => {

        //通知开始摘苹果
        //dispatch(actions.beginLoadL1SummaryData());

        //发送摘苹果请求
        fetch('/api/service/getUserInfo', {
            method: 'GET',
            headers: {
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            },
            credentials: 'same-origin'
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(res => {
            if(res.data){
                dispatch(actions.doneLoadUserInfo(res.data));
            }else{
                throw 'Invalid result!';
            }
        })
        .catch(err => {
            console.log(err);
            //dispatch(actions.failPickApple(err));
        });
    },

    doneLoadUserInfo: data => ({
        type: 'service/DONE_LOAD_USER_INFO',
        payload: data
    }),

    updateMouseOverOrgCard: (cardId, mouseOver) => ({
        type: 'myorg/UPDATE_MOUSEOVER_ORG_CARD',
        payload: {
            cardId,
            mouseOver,
        }
    }),

    updateSearchValue: data => ({
      type: 'myorg/UPDATE_SEARCH_VALUE',
      payload: data
    }),

    updateParamControl: data => ({
      type: 'param/UPDATE_PARAM_CONTROL',
      payload: data
    }),

};

export default actions;
