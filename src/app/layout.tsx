// Add your imports here
import React from 'react';

// Your component code
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// Export the component to make this file a module
export default Layout;
