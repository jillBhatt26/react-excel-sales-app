import Main from './components/Main';
import Nav from './components/Nav';

const App = () => {
    return (
        <div className="h-screen bg-bgBody overflow-auto">
            <Nav />
            <Main />
        </div>
    );
};

export default App;
