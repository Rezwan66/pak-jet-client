import { Link } from 'react-router';
import logo from '../../../assets/logo.png';

const PakJetLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-[5px]" src={logo} alt="" />
        <p className="text-3xl -ml-3 italic font-extrabold tracking-wide">
          Pakjet
        </p>
      </div>
    </Link>
  );
};
export default PakJetLogo;
