import {memo} from 'react';
import {ReactResource} from '../utils/react-resources-utils.js';
import {User} from './getUser.js';

export interface ProfileDetailsProps {
  userResource: ReactResource<User | undefined>;
}

function ProfileDetails(props: ProfileDetailsProps) {
  const {userResource} = props;

  // Try to read user info, although it might not have loaded yet
  const user: User | undefined = userResource.read();

  if(user) return <h1>{user.name}</h1>;
  else return <h1>User with specified ID was not found.</h1>
}

export default memo(ProfileDetails);
