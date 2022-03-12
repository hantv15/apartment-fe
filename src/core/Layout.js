import React from 'react';

const Layout = ({ title = "title", description = "Description", className, children }) => {
    return (
        <div className={className}>
            
            <main>
                {children}
            </main>
        </div>
    )
};

export default Layout;
