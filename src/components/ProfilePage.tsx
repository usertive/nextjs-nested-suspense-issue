import {ChangeEvent, memo, Suspense, useCallback, useState, useTransition} from 'react';
import {ErrorBoundary} from './ErrorBoundary';
import ProfileDetails from './ProfileDetails';
import ProfileTimeline from './ProfileTimeline';
import {ReactResource, wrapPromise} from '../utils/react-resources-utils';
import {getUser, User} from './getUser';
import {getPosts, Post} from './getPosts';
import {NextPage} from 'next';

const ProfilePage: NextPage = function ProfilePage() {
  const [isUserChangeTransitionPending, startUserChangeTransition] = useTransition();
  const [userId, setUserId] = useState<number>(1);
  const [userResource, setUserResource] = useState<ReactResource<User | undefined>>(wrapPromise(getUser(1)));
  const [postsResource, setPostsResource] = useState<ReactResource<Post[]>>(wrapPromise(getPosts(1)));

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const newUserId: number = parseInt(event.target.value);
    setUserId(newUserId);
    startUserChangeTransition(() => {
      setUserResource(wrapPromise(getUser(newUserId)));
      setPostsResource(wrapPromise(getPosts(newUserId)));
    });
  }, []);

  return (
    <>
      <div className={'profile'}>
        Select user by ID:&nbsp;
        <select onChange={handleSelectChange} className={'profile-select'}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        <div className={'profile-metadata'}>
          <p>Displaying data for user with ID: {userId}</p>
          <p>Data is {isUserChangeTransitionPending ? 'updating...' : 'up to date'}.</p>
        </div>

        <ErrorBoundary fallback={<p>Unable to fetch profile!</p>}>
          <Suspense fallback={<p>Loading profile...</p>}>
            <ProfileDetails userResource={userResource}/>

            <ErrorBoundary fallback={<p>Unable to fetch posts for user with ID {1}!</p>}>
              <Suspense fallback={<p>Loading posts...</p>}>
                <ProfileTimeline postsResource={postsResource}/>
              </Suspense>
            </ErrorBoundary>
          </Suspense>
        </ErrorBoundary>
      </div>

      <style jsx>{`
        .profile {
          background-color: #b2dfdb;
          padding: 24px;
        }

        .profile-select {
          width: 50px;
          margin-bottom: 24px;
        }

        .profile-metadata {
          background-color: #80cbc4;
          padding: 6px 8px;
          margin-bottom: 24px;
        }
      `}</style>
    </>
  );
};

export default memo(ProfilePage);
