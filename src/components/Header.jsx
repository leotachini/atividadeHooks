import styles from "./Header.module.css";

const Header = () => {

  return (
    <div>
      <div className={styles.header}>     
        <nav>
          <ul className={styles.ul}>
            <li>Header</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
