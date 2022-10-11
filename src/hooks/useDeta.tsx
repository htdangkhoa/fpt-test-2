import { Deta } from "deta";

const deta = Deta("c0t3njgt_SUwYKjV3xPEcnZRMHAEke1VAn1oJ1d8m");

const useDetaBase = (databaseName: string) => {
  const db = deta.Base(databaseName);

  return db;
};

export default useDetaBase;
