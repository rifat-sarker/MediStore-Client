import Logo from "@/app/assets/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-12  text-black py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left text-black">
        {/* Logo Section */}
        <div className="mx-auto">
          <Image className="mx-auto" src={Logo} height={100} width={100} alt="logo" />
          <p className="text-sm  mt-2">
            <MailIcon className="inline" /> rifatswd@gail.com
          </p>
          <p className="text-sm  mt-2">
            <PhoneIcon className="inline" /> +8801642550487
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="text-lg font-semibold">Important Links</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/all-product">All Products</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex justify-center sm:justify-start mt-3 space-x-4  text-2xl">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold">Newsletter</h4>
          <p className="text-sm  mt-2">
            Subscribe for updates on new arrivals and discounts.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-3 p-2 rounded  placeholder-gray-500 border border-primary  focus:outline-none"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} MediStore. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
