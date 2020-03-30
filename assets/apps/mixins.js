/**
 *  Mixin
 * 
 */
var logMixin = {
    _log: function(methodName, args) {
        console.log(`${this.name}::${methodName}`, args);
    },
    componentWillUpdate: function() {
        this._log('componentWillUpdate', arguments);
    },
    componentDidUpdate: function(oldProps, oldState) {
        this._log('componentDidUpdate', arguments);
    },
    componentWillMount: function() {
        this._log('componentWillMount', arguments);
    },
    componentDidMount: function() {
        this._log('componentDidMount', arguments);
    },
    componentWillUnmount: function() {
        this._log('componentWillUnmount', arguments);
    }
};

// var textAreaCounter = React.createClass({
//     name: 'TextAreaCounter',
//     mixins: [logMixin],
//     // todo o resto...
//     render: function() {}
// });