const Header = (props) => {
    const { title } = props;

    return(
        <header className="header">
            <h2>{title}</h2>
        </header>
    )
}

export default Header;