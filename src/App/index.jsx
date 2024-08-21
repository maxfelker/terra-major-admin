import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountsList from '../AccountsList';
import Account from '../Account';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<AccountsList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </FluentProvider>
  );
}

export default App;