import Rating from './Rating';
import Suggest from './Suggest';

export class FormInput extends React.Component {

    getValue() {}
    render() {
        // propriedades aplicáveis a todos
        const common = {
            id: this.props.id,
            ref: 'input',
            defaultValue: this.props.defaultValue
        };

        switch (this.props.type) {
            case 'year':
                return (
                    <input
                        {...common}
                        type="number"
                        defaultValue={this.props.defaultValue || new Date().getFullYear()} />
                );
            case 'suggest':
                return <Suggest {...common} options={this.props.options} />;
            case 'rating':
                return (
                    <Rating
                        {...common}
                        defaultValue={parseInt(this.props.defaultValue, 10)} />
                );
            case 'text':
                return <textarea {...common} />;
            default:
                return <input {...common} type="text" />;
        }
    }

}

FormInput.propTypes = {
    type: React.PropTypes.oneOf([
        'year', 'suggest', 'rating', 'text', 'input'
    ]),
    id: React.PropTypes.string,
    options: React.PropTypes.array,
    defaultValue: React.PropTypes.any
};