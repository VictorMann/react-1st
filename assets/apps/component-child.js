 /**
 *  Usando um componente filho
 *
 */
var Counter = React.createClass({
    name: 'Counter',
    // mixins: [logMixin],
    propTypes: {
        count: React.PropTypes.number.isRequired
    },
    // evitando atualizações de componentes
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.count !== nextProps.count;
    },
    render: function() {
        console.log(`${this.name}::render()`);
        return React.DOM.span(null, this.props.count);
    }
});

var textAreaCounter = React.createClass({
    name: 'TextAreaCounter',
    // mixins: [logMixin],
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
    componentDidUpdate: function(oldProps, oldState) {
        // this._log('componentDidUpdate', arguments);

        // validação
        if (this.state.text.length > 3) {
            this.replaceState(oldState);
        }
    },
    render: function() {

        console.log(`${this.name}::render()`);

        let counter = null;

        if (this.state.text.length > 0) {
            counter = React.DOM.h3(null,
                React.createElement(Counter, {
                    count: this.state.text.length
                })
            );
        }

        return React.DOM.div(null,
            React.DOM.textarea({
                value: this.state.text,
                onChange: this._textChange
            }),
            counter
        );
    }
});

ReactDOM.render(
    React.createElement(textAreaCounter, {defaultValue: 'bob'}),
    document.getElementById('app')
);