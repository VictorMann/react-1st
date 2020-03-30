ReactDOM.render(
    React.DOM.h1(
        {id: "my-header"}, 
        "Hello world",
        React.DOM.small({
            style: {
                color: 'red'
            }}, 
            ' - sub titulo'
        )
    ),
    document.getElementById('app')
);