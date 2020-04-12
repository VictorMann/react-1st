import FormInput from './FormInput';


export class Form extends React.Component {

    getData() {
        let data = {};
        this.props.fields.forEach(field =>
            data[field.id] = this.refs[field.id].getValue()
        );

        return data;
    }
    render() {
        return (
            <form className="Form">
                {this.props.fields.map(field => {
                    const prefilled = this.props.initialData && this.props.initialData[field.id];
                    
                    if (!this.props.readonly) {
                        return (
                            <div className="FormRow" key={field.id}>
                                <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
                                <FormInput {...field} ref={field.id} defaultValue={prefilled} />
                            </div>
                        );
                    }

                    if (!prefilled) return null;

                    return (
                        <div className="FormRow" key={field.id}>
                            <span className="FormLabel">{field.label}</span>
                            {
                                field.type === 'rating'
                                ? <Rating readonly={true} defaultValue={parseInt(prefilled, 10)} />
                                : <div>{prefilled}</div>
                            }
                        </div>
                    );

                }, this)}
            </form>
        );
    }
}

Form.propTypes = {
    fields: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired,
            type: React.PropTypes.string,
            options: React.arrayOf(React.PropTypes.string)
        })
    ).isRequired,
    initialData: React.PropTypes.object,
    readonly: React.PropTypes.bool
};