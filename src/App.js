import logo from './logo.svg';
import './App.css';
import Todo from './Todo/Todo';

function App() {
  return (
    <main className="container-fluid" style={{padding: '32px 0'}}>
      <h1 style={{textAlign: 'center'}}>Simple Todo React App</h1>
      <Todo />
    </main>
  );
}

export default App;
