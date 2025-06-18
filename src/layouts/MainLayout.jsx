import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main className="w-full">{children}</main>
            <Footer />
        </>
    );
}

export default MainLayout;
