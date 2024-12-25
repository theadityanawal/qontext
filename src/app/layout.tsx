import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
