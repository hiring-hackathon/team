import { Button } from "@/components/ui/button"; // Adjust import based on your file structure
// import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // You might use react-icons for social media icons

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">Company Name</h2>
                        <p className="text-gray-400">© 2024 Company Name. All rights reserved.</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
                        <Button variant="secondary" size="sm" className="mb-2 md:mb-0">
                            <a href="/about">About Us</a>
                        </Button>
                        <Button variant="secondary" size="sm" className="mb-2 md:mb-0">
                            <a href="/services">Services</a>
                        </Button>
                        <Button variant="secondary" size="sm" className="mb-2 md:mb-0">
                            <a href="/contact">Contact</a>
                        </Button>
                    </div>
                    {/* <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaFacebook size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaGithub size={20} />
                        </a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
