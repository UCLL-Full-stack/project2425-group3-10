// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="header">
            <p className="text-sm">
                © {new Date().getFullYear()} PlayPal. Alle rechten voorbehouden.
            </p>
        </footer>
    );
};

export default Footer;
