import BottomPanel from '../BottomPanel';
import { ErrorAlert } from '../ErrorAlert';
import InfoModal from '../InfoModal';
import Map from '../Map';

const App = () => {
  return (
    <>
      <Map></Map>
      <BottomPanel></BottomPanel>
      <ErrorAlert></ErrorAlert>
      <InfoModal></InfoModal>
    </>
  );
};

export default App;
