(function (React, ReactDOM, ReactRedux, Redux, ReduxThunk) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
    var ReactRedux__default = /*#__PURE__*/_interopDefaultLegacy(ReactRedux);
    var Redux__default = /*#__PURE__*/_interopDefaultLegacy(Redux);
    var ReduxThunk__default = /*#__PURE__*/_interopDefaultLegacy(ReduxThunk);

    const initialState = () => ({
        error: null,
        isLoading: false,
        data: null,
    });
    const reducer = (state = initialState(), action) => {
        // console.log('app/state', 'action:', action);
        switch (action.type) {
            case 'LOADING': return Object.assign(Object.assign({}, state), { error: null, isLoading: true, data: null });
            case 'LOADED': return Object.assign(Object.assign({}, state), { error: null, isLoading: false, data: action.payload.data });
            case 'LOAD_ERROR': return Object.assign(Object.assign({}, state), { error: action.payload.error, isLoading: false, data: null });
            default: return state;
        }
    };

    const Schedule = ({ data }) => (React__default["default"].createElement("ul", null, data.map(i => React__default["default"].createElement("li", null, i))));

    const ErrorBanner = ({ error: { name, message } }) => (React__default["default"].createElement("p", { className: 'error banner' },
        name,
        ": ",
        message));

    const App$1 = ({ data = null, isLoading = false, error = null, loadData }) => {
        React.useEffect(() => { loadData(); }, []);
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement("h1", null, "Pills (v1)"),
            data && React__default["default"].createElement(Schedule, { data: data }),
            isLoading && React__default["default"].createElement("p", null, "Loading..."),
            error && React__default["default"].createElement(ErrorBanner, { error: error })));
    };

    // const fetchData = () => (
    //   fetch('https://spamfro.xyz/api/data')   // config.data.url
    //     .then(resp => { 
    //       if (!resp.ok) { throw Error(resp.statusText) }
    //       return resp.json();
    //     })
    // );
    const fetchData = () => Promise.resolve([
        'item #1',
        'item #2',
        'item #3',
        'item #4',
        'item #5',
    ]);

    const loading = () => ({ type: 'LOADING' });
    const loaded = (data) => ({ type: 'LOADED', payload: { data } });
    const loadedError = (error) => ({ type: 'LOADED', payload: { error } });
    const loadData = () => (dispatch, getState) => {
        dispatch(loading());
        fetchData()
            .then(data => dispatch(loaded(data)))
            .catch(error => dispatch(loadedError(error)));
    };

    const mapStateToProps = ({ data, isLoading, error }) => ({ data, isLoading, error });
    const mapDispatchToProps = (dispatch) => ({
        loadData: () => dispatch(loadData())
    });
    const App = ReactRedux__default["default"].connect(mapStateToProps, mapDispatchToProps)(App$1);

    const renderUi = (node) => {
        ReactDOM__default["default"].render(React__default["default"].createElement(ReactRedux__default["default"].Provider, { store: store() },
            React__default["default"].createElement(App, null)), node);
    };
    const store = () => Redux__default["default"].createStore(reducer, Redux__default["default"].applyMiddleware(ReduxThunk__default["default"]));

    renderUi(document.getElementById('app'));
    window.addEventListener('load', () => {
        // register();
    });

})(React, ReactDOM, ReactRedux, Redux, ReduxThunk);
