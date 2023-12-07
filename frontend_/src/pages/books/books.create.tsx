import { BookCreateContainer } from '../../containers/cars';
import Dashboard from '../../layouts/dashboard';
import PrivateProvider from '../../providers/PrivateProvider';

export default function Create() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookCreateContainer />
      </Dashboard>
    </PrivateProvider>
  );
}
