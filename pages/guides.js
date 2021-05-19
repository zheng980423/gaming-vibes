import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Guides.module.css';
import AuthContext from '../stores/authContext';
export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token,
          },
        }
      )
        .then(res => {
          if (!res.ok) {
            throw Error('YOu must be logged in to view this content');
          }
          return res.json();
        })
        .then(data => {
          setGuides(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);
  return (
    <div className={styles.guides}>
      {!authReady && <div>loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides &&
        guides.map(guide => (
          <div className={styles.card} key={guide.title}>
            <h3>{guide.title}</h3>
            <h4>{guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              provident. Odit vel sit aspernatur ad possimus impedit aliquid
              laborum eaque ullam expedita blanditiis fuga animi necessitatibus
              aliquam, illo eos? Quasi ratione, obcaecati perspiciatis ducimus
              perferendis, delectus voluptatibus, tempore facilis doloribus
              aliquam deleniti. Magni, illum tempora officia porro deleniti ex
              ducimus?
            </p>
          </div>
        ))}
    </div>
  );
}
