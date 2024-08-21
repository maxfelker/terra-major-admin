import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import AccountsList from '../AccountsList';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <AccountsList />
    </FluentProvider>
  )
}

export default App;
