import { useEffect } from "react";
import { useUserStore } from "../entities/user/user.store";

interface Props {
  children: JSX.Element;
}

export function App(props: Props) {
  const { children } = props;
  const { isInitialized, initialization } = useUserStore();
  useEffect(() => {
    if (!isInitialized) initialization();
  }, [isInitialized, initialization]);

  return <>{children}</>;
}
