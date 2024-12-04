import React from "react";

const Footer = () => {
    return (
        <footer className="my-6">
            <div className="container mx-auto px-4">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} Nghiem Dang Tri. DEV TEACH’R 2024 Recruitment Test.
                </p>
            </div>
        </footer>
    );
};      

export default Footer;