
import { useEffect } from 'react';

/**
 * @hook useMount
 * @desc ComponentDidMount likes
 * */
const useMount = (callback:any) => {
  useEffect(callback, []);
};

export default useMount;