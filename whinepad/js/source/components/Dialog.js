import Button from './Button';
import {classNames} from '../utils/functions';

export class Dialog extends React.Component {
    componentWillUnmount() {
        document.body.classList.remove('DialogModalOpen');
    }
    componentDidMount() {
        if (this.props.modal) document.body.classList.add('DialogModalOpen');
    }

    render() {
        return (
            <div className={classNames({'Dialog': true, 'DialogModal': this.props.modal})}>
                <div className={this.props.modal ? 'DialogModalWrap' : null}>
                    <div className="DialogHeader">
                        {this.props.header}
                    </div>
                    <div className="DialogBody">
                        {this.props.children}
                    </div>
                    <div className="DialogFooter">
                        {
                            this.props.hasCancel
                            ? <span
                                className="DialogDismiss"
                                onClick={this.props.onAction.bind(this, 'dismiss')}
                              >
                                Cancel
                              </span>
                            : null
                        }
                        <Button onClick={this.props.onAction.bind(this,
                            this.props.hasCancel ? 'confirm' : 'dismiss'
                        )}>
                            {this.props.confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.propTypes = {
    header: React.PropTypes.string.isRequired,
    confirmLabel: React.PropTypes.string,
    modal: React.PropTypes.bool,
    onAction: React.PropTypes.func,
    hasCancel: React.PropTypes.bool
};

Dialog.defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: () => {},
    hasCancel: true
};