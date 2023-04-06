import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
