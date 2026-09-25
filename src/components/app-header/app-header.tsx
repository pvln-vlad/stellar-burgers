import { getUserSelector } from '@slices/user-slice';
import { AppHeaderUI } from '@ui';

import { useSelector } from '@services/store';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(getUserSelector);

  return <AppHeaderUI userName={user?.name ?? ''} />;
};
