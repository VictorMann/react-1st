import {Logo} from './components/Logo';
import {Excel} from './components/Excel';
import {Button} from './components/Button';
import {Rating} from './components/Rating';

let headers = localStorage.getItem('headers');
let data = localStorage.getItem('data');

if (!headers) {
    headers = ['Title', 'Years', 'Rating', 'Comments'];
    data = [['Test', '2015', '3', 'meh']];
}

ReactDOM.render(
    <div>
        <h1>
            <Logo /> Welcome to the App!
        </h1>
        <Excel headers={headers} initialData={data} />
        <Button onClick={() => alert('ok')}>Exemplo</Button>
        <Rating />
    </div>,
    document.getElementById('app')
);