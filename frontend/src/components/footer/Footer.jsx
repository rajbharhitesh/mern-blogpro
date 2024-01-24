const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles}>
      <p>BlogPro &copy; {currentYear}</p>
    </footer>
  );
};

const styles = {
  color: 'var(--white-color)',
  fontSize: '21px',
  backgroundColor: 'var(--blue-color)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
};

export default Footer;
