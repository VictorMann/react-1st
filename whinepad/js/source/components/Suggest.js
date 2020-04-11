export class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.defaultValue};
    }
    getValue() {
        // return this.refs.lowlevelinput.value;
        return this.state.value; // nao usa mais 'ref'
    }
    render() {
        const randomid = Math.random().toString(16).substring(2);
        return (
            <div>
                <input
                    list={randomid}
                    defaultValue={this.props.defaultValue}
                    // ref="lowlevelinput"
                    onChange={e => this.setState({value: e.target.value})}
                    id={this.props.id} />
                <detailist id={randomid}>
                    {this.props.options.map((item, idx) =>
                        <option value={item} key={idx} />
                    )}
                </detailist>
            </div>
        );
    }
}

Suggest.propTypes = {
    options: React.PropTypes.arrayOf(
        React.PropTypes.string
    )
};