import Home from '../components/Features/Home';
import HomeConnected from '../components/Features/HomeConnected';
import { useAuthProvider } from '../context/authContext';

const HomePage = () => {
  const { user } = useAuthProvider();
  return <>{user ? <HomeConnected /> : <Home />}</>;
};

export default HomePage;
