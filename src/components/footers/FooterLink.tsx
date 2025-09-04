"use client";
type Props = {
  url?: string;
  children: React.ReactNode;
};
const FooterLink = ({ url = "#", children }: Props) => {
  return (
    <li>
      <a href={url} className="text-white hover:text-secondary">
        {children}
      </a>
    </li>
  );
};

export default FooterLink;
