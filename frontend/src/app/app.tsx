import { useEffect } from "react";
import { useUserStore } from "../entities/user/user.store";

interface Props {
  children: JSX.Element;
}

export function App(props: Props) {
  const { children } = props;
  const { token, isInitialized, initialization } = useUserStore();

  useEffect(() => {
    if (!isInitialized) initialization();
  }, [token, initialization, isInitialized]);

  return <>{children}</>;
}
