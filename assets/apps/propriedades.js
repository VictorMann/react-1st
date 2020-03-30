/**
 *  Propriedades
 * 
 */ 
        
// V1
// var component = React.createClass({
//     render: function() {
//         return React.DOM.h1(null, 'My name is ' + this.props.name);
//     }
// });
// ReactDOM.render(
//     React.createElement(component, {name: 'Bob'}),
//     document.getElementById('app')
// );

// V2
var textAreaCounter = React.createClass({
    propTypes: {
        text: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            text: ''
        }
    },
    render: function() {
        return React.DOM.div(null,
            React.DOM.textarea({
                defaultValue: this.props.text
            }),
            React.DOM.h1(null, this.props.text.length)
        );
    }
});

ReactDOM.render(
    React.createElement(textAreaCounter, {text: 'bob'}),
    document.getElementById('app')
);