import Headling from '../../components/Headling/Headling'
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import cn from 'classnames';

export function Menu() {
    return (
      <>
        <div className={cn(styles["header-container"])}>
          <Headling>Menu Page</Headling>
          <Search placeholder="Enter menu or composition" />
        </div>
      </>
    );
}