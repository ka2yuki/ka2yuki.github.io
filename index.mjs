// import { createRoot } from 'react-dom/client';
const createRoot = require('react-dom/client');
document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

function Greeting() {
    return <h1>Hello, world</h1>;
}
root.render(<Greeting />);

