"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import FooterSection from "./FooterSection";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="bg-white text-secondary p-2 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center font-bold text-xl">
                  WM
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">WiniMix</h3>
                <p className="text-sm text-white">
                  Quality Parts for Every Car
                </p>
              </div>
            </div>
            <p className="text-white mb-4">
              We provide high-quality auto spare parts with trusted service and
              fast delivery.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Facebook className="w-5 h-5 text-white hover:text-secondary cursor-pointer" />
              <Twitter className="w-5 h-5 text-white hover:text-secondary cursor-pointer" />
              <Instagram className="w-5 h-5 text-white hover:text-secondary cursor-pointer" />
              <Youtube className="w-5 h-5 text-white hover:text-secondary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <FooterLink>Shop</FooterLink>
            <FooterLink>Categories</FooterLink>
            <FooterLink>Brands</FooterLink>
            <FooterLink>Special Deals</FooterLink>
            <FooterLink>Warranty</FooterLink>
          </FooterSection>

          {/* Categories */}
          <FooterSection title="Categories">
            <FooterLink>Shop</FooterLink>
            <FooterLink>Categories</FooterLink>
            <FooterLink>Brands</FooterLink>
            <FooterLink>Special Deals</FooterLink>
            <FooterLink>Warranty</FooterLink>
          </FooterSection>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-white">
                  123 Auto Street, Riyadh, Saudi Arabia
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-white">+966 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-white" />
                <span className="text-white">info@autospares.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/60 mt-8 pt-8 text-center">
          <p className="text-white">© 2025 WiniMix All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
