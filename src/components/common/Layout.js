import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <Header />
      <TopBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
