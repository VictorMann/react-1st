/**
 *  Criando componentes personalizados 
 * 
 */ 
var component = React.createClass({
    render: function() {
        return React.DOM.h1(null, 'Meu componente personalizado');
    }
});
ReactDOM.render(
    React.createElement(component),
    document.getElementById('app')
);