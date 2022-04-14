import {memo} from 'react';
import {ReactResource} from '../utils/react-resources-utils.js';
import {Post} from './getPosts.js';

export interface ProfileTimelineProps {
  postsResource: ReactResource<Post[]>;
}

function ProfileTimeline(props: ProfileTimelineProps) {
  const {postsResource} = props;

  // Try to read posts, although they might not have loaded yet
  const posts: Post[] = postsResource.read();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export default memo(ProfileTimeline);
