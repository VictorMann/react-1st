/**
 *  Spread Operator basico
 * 
 */
// var attr = {
//     href: 'https://ociclista.com.br',
//     target: '_blank',
//     title: 'Site OCiclista'
// };

// ReactDOM.render(
//     <a {...attr}>Site OCiclista</a>,
//     document.getElementById('app')
// );



/**
 *  Spread Operator de pai para filho
 * 
 */
// var FancyLink = React.createClass({
//     render: function() {
        
//         switch (this.props.size) {
//             // faz algo com base na propriedade 'size'
//         }

//         return <a {...this.props}>{this.props.children}</a>
//     }
// });

// ReactDOM.render(
//     <FancyLink
//         href="https://ociclista.com.br"
//         style={{color: 'blue'}}
//         target="_blank"
//         size="medium">
//         hello
//     </FancyLink>,
//     document.getElementById('app')
// );



/**
 *  Array de filhos
 * 
 */
// var Example = React.createClass({
//     render: function() {
        
//         let greeting = [
//             <a key="great">Hello</a>,
//             ' ',
//             <a key="world">World</a>,
//             '!'
//         ];

//         return (
//             <div>
//                 {greeting}
//             </div>
//         );
//     }
// });

// ReactDOM.render(
//     <Example></Example>,
//     document.getElementById('app')
// );

/**
 *  Example 2
 */
var Example = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render(
    <Example>
        <a key="great">Hello</a>
        {' '}
        <a key="world">World</a>
        !
    </Example>,
    document.getElementById('app')
);