import {classNames} from '../utils/functions';

export var Button = React.createClass({
    propTypes: {
        href: React.PropTypes.string
    },
    render: function() {
        const cssclasses = classNames('Button', this.props.className);
    
        return this.href
        ? <a {...this.props} className={cssclasses} />
        : <button {...this.props} className={cssclasses} />;
    }
});