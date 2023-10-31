import ToasterContext from './context/ToasterContext';
import './globals.css';
import AuthContext from './context/AuthContext';
import { Poppins } from 'next/font/google';
import clsx from 'clsx';

const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });

export const metadata = {
  title: 'Progenda',
  description: 'Progenda is to-do list app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          poppins.className,
          'bg-background_LM dark:bg-background_DM text-text_LM dark:text-text_DM p-4'
        )}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
