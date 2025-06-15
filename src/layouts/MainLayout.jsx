import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 min-h-[80vh]">{children}</main>
            <Footer />
        </>
    );
}

export default MainLayout;
