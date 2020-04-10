/**
 *  Excel com JSX
 *
 */

var headers = [
    "Book", "Author", "Language", "Published", "Sales"
];

var data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"], 
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"], 
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"], 
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"], 
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"], 
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"], 
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

var Excel = React.createClass({
    displayName: 'Excel', // apenas para depuração, verifique ao remover key do th
    _preSearchData: null,
    _log: [],
    propTypes: {
        headers: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },
    _logSetState: function(newState) {
        // guarda o estado antigo em um clone
        this._log.push(JSON.parse(JSON.stringify(
            this._log.length === 0 ? this.state : newState
        )));

        this.setState(newState);
    },
    getInitialState: function() {
        return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // {row: index, cell: index}
            search: false
        }
    },
    _sort(ev) {
        let column = ev.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby == column && !this.state.descending;

        data = descending
        ? data.reverse()
        : data.sort((a,b) => {
            if (a[column] == b[column]) return 0;
            return a[column] > b[column] ? 1 : -1
        });

        this._logSetState({
            data: data,
            sortby: column,
            descending: descending
        });
    },
    _showEditor: function(ev) {
        this._logSetState({
            edit: {
                row: parseInt(ev.target.dataset.row, 10),
                cell: ev.target.cellIndex
            }
        });
    },
    _save: function(ev) {
        ev.preventDefault();

        let input = ev.target.firstElementChild;
        let data = this.state.data.slice();
        let row = this.state.edit.row, cell = this.state.edit.cell;
        data[row][cell] = input.value;

        this._logSetState({
            edit: null, // edição finalizada
            data: data
        });
    },
    _toggleSearch: function(ev) {
        if (this.state.search) {
            this._logSetState({
                data: this._preSearchData,
                search: false
            });
        } else {
            this._preSearchData = this.state.data;
            this._logSetState({
                search: true
            });
        }
    },
    _search: function(ev) {
        let needle = ev.target.value.toLowerCase();
        if (!needle) {
            this._logSetState({
                data: this._preSearchData
            });
            return;
        }

        let idx = ev.target.dataset.idx; // coluna a ser pesquisada
        let searchData = this._preSearchData.filter(row => {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });

        this._logSetState({
            data: searchData
        });
    },
    _replay: function() {
        if (this._log.length == 0) {
            console.warn('No state to replay yet');
            return;
        }

        let idx = -1;
        let interval = setInterval(function() {
            idx ++;
            if (idx === this._log.length - 1) { // fim
                clearInterval(interval);
            }
            this.setState(this._log[idx]);
        }.bind(this), 1000);
    },
    _download: function(format, ev) {
        let contents = format == 'json'
        ? JSON.stringify(this.state.data)
        : this.state.data.reduce((result, row) => {
            return result
                + row.reduce((rowresult, cell, idx) => {
                    return rowresult
                        + '"'
                        + cell.replace(/"/g, '""')
                        + '"'
                        + (idx < row.length - 1 ? ';' : '')
                }, '')
                + "\n";
        }, '');

        let URL = window.URL || window.webkitURL;
        let blob = new Blob([contents], {type: 'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;
    },
    _renderTable() {
        return (
            <table>
                <thead onClick={this._sort}>
                    <tr>
                        {this.props.headers.map((title, idx) => 
                            <th key={idx}>
                                {title}
                                {
                                    this.state.sortby === idx
                                    ? this.state.descending
                                        ? ' \u2191'
                                        : ' \u2193'
                                    : null
                                }
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}>
                    {this._renderSearch()}
                    {this.state.data.map((row, rowidx) =>
                        <tr key={rowidx}>
                            {row.map((cell, idx) => {

                                let content = cell;
                                let edit = this.state.edit;

                                if (edit && edit.row == rowidx && edit.cell == idx) {

                                    content = (
                                        <form onSubmit={this._save}>
                                            <input type="text" defaultValue={content} />
                                        </form>
                                    );
                                }

                                return <td key={idx} data-row={rowidx}>{content}</td>
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    },
    _renderToolbar() {
        return (
            <div className="toolbar">
                <button onClick={this._toggleSearch}>search</button>
                <a onClick={this._download.bind(this, 'json')} href="data.json">Export JSON</a>
                <a onClick={this._download.bind(this, 'csv')} href="data.csv">Export CSV</a>
            </div>
        );
    },
    _renderSearch: function() {
        if (!this.state.search) return;

        return (
            <tr onChange={this._search}>
                {this.props.headers.map((_ignore, idx) =>
                    <td key={idx}>
                        <input type="text" data-idx={idx} />
                    </td>
                )}
            </tr>
        );
    },
    render: function() {

        return (
            <div>
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        );
    },
    componentDidMount: function() {
        document.onkeydown = function(ev) {
            if (ev.altKey && ev.shiftKey && ev.keyCode == 82) { // ALT + SHIFT + R(eplay)
                this._replay();
            }
        }.bind(this);
    }
});

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data    
    }),
    document.getElementById('app')
);