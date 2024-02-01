const FooterItem = ({ children }) => {
    return (
        <>
            <span>{children}</span>
        </>
    )
}

const Footer = () => {
    return (
        <footer className="border-t border-t-slate-200 w-full flex flex-col p-2 rounded-sm bg-white shadow-slate-950 items-center">
            <FooterItem>吉首大学刘宇阳提供技术支持</FooterItem>
            <FooterItem>2023 - {new Date().getFullYear()}</FooterItem>
        </footer>
    )
}
export default Footer;