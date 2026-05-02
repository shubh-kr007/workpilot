import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, title = 'Dashboard' }) => {
    return (
        <div className="flex h-screen bg-white dark:bg-dark-950">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 overflow-hidden">
                {/* Navbar */}
                <Navbar title={title} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;