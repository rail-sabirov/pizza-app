import cn from 'classnames';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(
    function Search({ isValid = true, className = '', ...props}: SearchProps, ref) {
        return (
          <div className={styles["search-wrapper"]}>
            <img
              className={styles["search-icon"]}
              src="/search-icon.svg"
              alt="search icon"
            />
            <input
              ref={ref}
              className={cn(styles.input, className, {
                [styles["invalid"]]: isValid,
              })}
              {...props}
            />
          </div>
        );
    }
)

export default Search;