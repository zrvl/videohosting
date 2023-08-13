import {Outlet} from 'react-router-dom'
import Header from './header/Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Header></Header>
        <main className="main">
          <Outlet/>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Layout;
