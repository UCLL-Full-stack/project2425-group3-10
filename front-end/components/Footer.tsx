// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="text-center py-8 bg-blue-700 text-blue-200">
            <p className="text-sm">
                © {new Date().getFullYear()} PlayPal. Alle rechten voorbehouden.
            </p>
        </footer>
    );
};

export default Footer;
