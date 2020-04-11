import {classNames} from '../utils/functions';

export class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue
        };
    }

    getValue() {
        return this.state.rating;
    }

    // no mouse over
    setTemp(rating) {
        this.setState({
            tmpRating: rating
        });
    }

    // no clique
    setRating(rating) {
        this.setState({
            tmpRating: rating,
            rating: rating
        });
    }

    // no mouse out, retorna à verdadeira classificação
    reset() {
        this.setTemp(this.state.rating);
    }

    // reage a mudanças externas
    componentWillReceiveProps(nextProps) {
        this.setRating(nextProps.defaultValue);
    }

    render() {
        const stars = [];
        for (let i = 1; i <= this.props.max; i ++) {
            stars.push(
                <span
                    className={i <= this.state.tmpRating ? 'RatingOn' : null}
                    key={i}
                    onClick={!this.props.readonly && this.setRating.bind(this, i)}
                    onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
                >
                    &#9734;
                </span>
            );
        }

        return (
            <div
                className={classNames({
                    'Rating': true,
                    'RatingReadonly': this.props.readonly
                })}
                onMouseOut={this.reset.bind(this)}
            >
                {stars}
                {this.props.readonly || !this.props.id
                    ? null
                    : <input
                        type="hidden"
                        id={this.props.id}
                        value={this.state.rating} />
                }
            </div>
        );
    }
}

Rating.propTypes = {
    defaultValue: React.PropTypes.number,
    readonly: React.PropTypes.bool,
    max: React.PropTypes.number
};

Rating.defaultProps = {
    defaultValue: 0,
    max: 5
};