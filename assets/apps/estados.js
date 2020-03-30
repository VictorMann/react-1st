/**
 *  Estado e métodos de ciclo de vida
 * 
 */ 
var textAreaCounter = React.createClass({
    propTypes: {
        defaultValue: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            text: this.props.defaultValue
        }
    },
    _textChange: function(ev) {
        this.setState({
            text: ev.target.value
        });
    },

    _log: function(methodName, args) {
        console.log(methodName, args);
    },
    componentWillUpdate: function() {
        this._log('componentWillUpdate', arguments);
    },
    componentDidUpdate: function(oldProps, oldState) {
        this._log('componentDidUpdate', arguments);

        // validação
        if (this.state.text.length > 3) {
            this.replaceState(oldState);
        }
    },
    componentWillMount: function() {
        this._log('componentWillMount', arguments);
    },
    componentDidMount: function() {
        this._log('componentDidMount', arguments);
    },
    componentWillUnmount: function() {
        this._log('componentWillUnmount', arguments);
    },
    
    render: function() {
        return React.DOM.div(null,
            React.DOM.textarea({
                value: this.state.text,
                onChange: this._textChange
            }),
            React.DOM.h1(null, this.state.text.length)
        );
    }
});

ReactDOM.render(
    React.createElement(textAreaCounter, {defaultValue: 'bob'}),
    document.getElementById('app')
);