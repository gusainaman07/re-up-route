import { ReactNode } from 'react';
import { Chatbot } from './Chatbot';

interface MobileLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export const MobileLayout = ({ children, showNavigation = true }: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      <main className={showNavigation ? "pb-20" : ""}>
        {children}
      </main>
      <Chatbot />
    </div>
  );
};